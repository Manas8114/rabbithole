// Pure-logic tests for the rank ladder and CQ scoring — the numbers every
// other part of the gamification layer depends on.
import { describe, it, expect } from 'vitest';
import {
  RANKS,
  XP_ACTIONS,
  INVITE_STAGES,
  STAMP_CATALOG,
  rankForXp,
  nextRankForXp,
  rankProgressPct,
  cqFromXp,
} from '../src/data/gamificationData';
import { trailsData } from '../src/data/curiosityTrailData';

describe('rank ladder', () => {
  it('returns the first rank at zero XP', () => {
    expect(rankForXp(0)).toBe(RANKS[0]);
    expect(rankForXp(0).name).toBe('Novice Cartographer');
  });

  it('returns the highest threshold reached', () => {
    expect(rankForXp(149).name).toBe('Novice Cartographer');
    expect(rankForXp(150).name).toBe('Field Researcher');
    expect(rankForXp(399).name).toBe('Field Researcher');
    expect(rankForXp(400).name).toBe('Verified Explorer');
  });

  it('caps at the top rank', () => {
    expect(rankForXp(10_000).name).toBe(RANKS[RANKS.length - 1].name);
    expect(nextRankForXp(10_000)).toBeNull();
    expect(nextRankForXp(400).name).toBe('Senior Analyst');
  });

  it('computes progress as a 0-100 fraction within the rank band', () => {
    expect(rankProgressPct(150)).toBe(0);
    // band 150->400: 175 is 10% through
    expect(rankProgressPct(175)).toBe(10);
    expect(rankProgressPct(275)).toBe(50);
    expect(rankProgressPct(10_000)).toBe(100);
  });

  it('maps CQ linearly onto the top threshold, capped at 100', () => {
    const top = RANKS[RANKS.length - 1].threshold;
    expect(cqFromXp(0)).toBe(0);
    expect(cqFromXp(top)).toBe(100);
    expect(cqFromXp(top * 2)).toBe(100);
  });
});

describe('XP table invariants', () => {
  it('every XP action pays a positive amount', () => {
    for (const [name, action] of Object.entries(XP_ACTIONS)) {
      expect(action.xp, `${name} XP should be positive`).toBeGreaterThan(0);
    }
  });

  it('invite pipeline is a contiguous stage ladder', () => {
    expect(INVITE_STAGES[0]).toBe('Sent');
    expect(INVITE_STAGES[INVITE_STAGES.length - 1]).toBe('Offer');
    expect(INVITE_STAGES).toHaveLength(4);
  });
});

describe('stamp catalog invariants', () => {
  it('every stamp has a unique id, code, icon, and positive bonus', () => {
    const ids = new Set(STAMP_CATALOG.map((s) => s.id));
    const codes = new Set(STAMP_CATALOG.map((s) => s.stampCode));
    expect(ids.size).toBe(STAMP_CATALOG.length);
    expect(codes.size).toBe(STAMP_CATALOG.length);
    for (const s of STAMP_CATALOG) {
      expect(typeof s.bonusXp).toBe('number');
      expect(s.bonusXp).toBeGreaterThan(0);
      expect(typeof s.check).toBe('function');
      expect(s.icon, `${s.id} needs an icon name`).toBeTruthy();
    }
  });

  it('Pathfinder demands every trail that exists in the data', () => {
    const pathfinder = STAMP_CATALOG.find((s) => s.id === 'pathfinder');
    const noneClaimed = { claimedOnce: {}, attendance: {}, inviteStatus: {}, completedWeeks: [] };
    expect(pathfinder.check(noneClaimed)).toBe(false);
    const allClaimed = {
      claimedOnce: Object.fromEntries(
        Object.keys(trailsData).map((id) => [`openTrail:${id}`, { xp: 15, ts: 0 }])
      ),
      attendance: {},
      inviteStatus: {},
      completedWeeks: [],
    };
    expect(pathfinder.check(allClaimed)).toBe(true);
  });
});
