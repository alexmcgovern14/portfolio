#!/usr/bin/env node

/**
 * JSX Validation Script
 * Validates JSX tag balance and conditional closures in ProjectDetailContent.tsx
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/components/project/ProjectDetailContent.tsx');

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found: ${filePath}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

// Count JSX elements
let sectionOpens = 0;
let sectionCloses = 0;
let sectionSelfCloses = 0;
let divOpens = 0;
let divCloses = 0;
let divSelfCloses = 0;
let mainOpens = 0;
let mainCloses = 0;

// Count conditionals
let conditionalOpens = 0;
let conditionalCloses = 0;

// Track for detailed reporting
const sectionStack = [];
const conditionalStack = [];
const issues = [];

// Find </main> position
let mainCloseLine = null;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('</main>')) {
    mainCloseLine = i + 1;
    break;
  }
}

if (!mainCloseLine) {
  issues.push({ type: 'error', message: 'Could not find </main> tag' });
}

// Analyze content before </main>
const analyzeUpTo = mainCloseLine ? mainCloseLine - 1 : lines.length;

for (let i = 0; i < analyzeUpTo; i++) {
  const line = lines[i];
  
  // Sections
  if (line.includes('<section') && line.includes('id=')) {
    if (line.includes('/>')) {
      sectionSelfCloses++;
    } else if (line.includes('>')) {
      sectionOpens++;
      const idMatch = line.match(/id="([^"]+)"/);
      if (idMatch) {
        sectionStack.push({ line: i + 1, id: idMatch[1] });
      }
    }
  }
  
  if (line.includes('</section>')) {
    sectionCloses++;
    if (sectionStack.length > 0) {
      sectionStack.pop();
    } else {
      issues.push({ type: 'warning', line: i + 1, message: 'Extra </section> closing tag' });
    }
  }
  
  // Divs
  const divOpensInLine = (line.match(/<div[^>]*>/g) || []).filter(d => !d.includes('/>')).length;
  const divClosesInLine = (line.match(/<\/div>/g) || []).length;
  const divSelfClosesInLine = (line.match(/<div[^>]*\/>/g) || []).length;
  
  divOpens += divOpensInLine;
  divCloses += divClosesInLine;
  divSelfCloses += divSelfClosesInLine;
  
  // Main
  if (line.includes('<main')) {
    mainOpens++;
  }
  
  if (line.includes('</main>')) {
    mainCloses++;
  }
  
  // Conditionals
  if (line.includes('{slug ===') && line.includes('&& (')) {
    conditionalOpens++;
    conditionalStack.push({ line: i + 1 });
  }
  
  if (line.includes(')}')) {
    conditionalCloses++;
    if (conditionalStack.length > 0) {
      conditionalStack.pop();
    } else {
      issues.push({ type: 'warning', line: i + 1, message: 'Extra )} closing' });
    }
  }
}

// Check for unclosed elements
if (sectionStack.length > 0) {
  sectionStack.forEach(section => {
    issues.push({ type: 'error', line: section.line, message: `Unclosed section: ${section.id}` });
  });
}

if (conditionalStack.length > 0) {
  conditionalStack.forEach(cond => {
    issues.push({ type: 'error', line: cond.line, message: 'Unclosed conditional' });
  });
}

// Calculate balances
const sectionBalance = sectionOpens - sectionCloses - sectionSelfCloses;
const divBalance = divOpens - divCloses - divSelfCloses;
const mainBalance = mainOpens - mainCloses;
const conditionalBalance = conditionalOpens - conditionalCloses;

// Report
console.log('=== JSX Validation Report ===\n');
console.log('JSX Elements:');
console.log(`  <main>: ${mainOpens} opens, ${mainCloses} closes → ${mainBalance === 0 ? '✓ Balanced' : `⚠️ ${mainBalance > 0 ? '+' : ''}${mainBalance}`}`);
console.log(`  <section>: ${sectionOpens} opens, ${sectionCloses} closes, ${sectionSelfCloses} self-closes → ${sectionBalance === 0 ? '✓ Balanced' : `⚠️ ${sectionBalance > 0 ? '+' : ''}${sectionBalance}`}`);
console.log(`  <div>: ${divOpens} opens, ${divCloses} closes, ${divSelfCloses} self-closes → ${divBalance === 0 ? '✓ Balanced' : `⚠️ ${divBalance > 0 ? '+' : ''}${divBalance}`}`);
console.log(`\nConditionals:`);
console.log(`  {slug === ... && (}: ${conditionalOpens} opens, ${conditionalCloses} closes → ${conditionalBalance === 0 ? '✓ Balanced' : `⚠️ ${conditionalBalance > 0 ? '+' : ''}${conditionalBalance}`}`);

if (issues.length > 0) {
  console.log(`\n⚠️ Found ${issues.length} issues:`);
  issues.forEach(issue => {
    const lineInfo = issue.line ? ` (line ${issue.line})` : '';
    console.log(`  ${issue.type.toUpperCase()}: ${issue.message}${lineInfo}`);
  });
  process.exit(1);
} else {
  console.log('\n✓ All JSX elements and conditionals are properly balanced!');
  process.exit(0);
}
