#!/usr/bin/env node
/**
 * Build-time guard for the two trail data files.
 *
 * studentsData.js and curiosityTrailData.js both describe the cohort's trails,
 * and a by-hand rename or count change in one silently breaks the other (a
 * trail card that navigates to a trail the trail view has no data for). This
 * script loads both files and fails the build when they drift:
 *
 *   - every student-side trail must exist in curiosityTrailData
 *   - its milestoneCount must equal the real trail's node (stage) count
 *   - the trail's studentId must match the student who claims it
 *   - every curiosityTrailData trail must be claimed by exactly one student
 *   - every trail must carry a shortLabel (used by the derived switcher)
 *
 * Run directly (node scripts/check-trail-consistency.mjs) or via `npm run build`
 * (wired as a prebuild step in package.json).
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

function loadStudents() {
  let src = readFileSync(resolve(root, 'src/data/studentsData.js'), 'utf8');
  src = src.replace(/^import .*$/gim, '');
  src = src.replace(/^export const students =/m, 'globalThis.__students =');
  src = src.replace(/^export const youSeedInquiry/m, 'const youSeedInquiry');
  new Function(src)();
  return globalThis.__students;
}

function loadTrails() {
  let src = readFileSync(resolve(root, 'src/data/curiosityTrailData.js'), 'utf8');
  src = src.replace(/^import .*$/gim, '');
  src = src.replace(/^export function [\s\S]*$/m, '');
  src = src.replace(/^export const trailsData =/m, 'globalThis.__trailsData =');
  src = src.replace(/^export const featuredTrailData/m, 'var featuredTrailData');
  new Function(src)();
  return globalThis.__trailsData;
}

const students = loadStudents();
const trailsData = loadTrails();

const problems = [];

// Every student-side trail must exist, with the right count and owner.
for (const st of students) {
  for (const tr of st.trails || []) {
    const real = trailsData[tr.id];
    if (!real) {
      problems.push(`${st.id} / ${tr.id}: no matching trail in curiosityTrailData`);
      continue;
    }
    if (real.studentId !== st.id) {
      problems.push(`${st.id} / ${tr.id}: claimed by ${real.studentId} in curiosityTrailData`);
    }
    const realNodes = real.nodes?.length || 0;
    if (tr.milestoneCount !== realNodes) {
      problems.push(`${st.id} / ${tr.id}: milestoneCount=${tr.milestoneCount} but the trail has ${realNodes} stages`);
    }
    if (!real.shortLabel) {
      problems.push(`${tr.id}: missing shortLabel (required by the derived trail switcher)`);
    }
  }
}

// Every curiosityTrailData trail must be claimed by exactly one student.
for (const tid of Object.keys(trailsData)) {
  const claimers = students.filter((s) => (s.trails || []).some((t) => t.id === tid));
  if (claimers.length === 0) {
    problems.push(`${tid}: defined in curiosityTrailData but claimed by no student`);
  } else if (claimers.length > 1) {
    problems.push(`${tid}: claimed by ${claimers.length} students (${claimers.map((s) => s.id).join(', ')})`);
  }
}

if (problems.length) {
  console.error('Trail data drift — the two data files disagree:');
  for (const p of problems) console.error('  • ' + p);
  console.error('\nFix the count/ownership above, or add the missing trail, then rebuild.');
  process.exit(1);
}

console.log(`Trail data consistent: ${Object.keys(trailsData).length} trails across ${students.filter((s) => s.trails?.length).length} students.`);
