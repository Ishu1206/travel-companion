const fs = require('fs');
const path = require('path');

// This script scans a small set of known locations in the Angular app
// to produce a simple architecture.json file consumed by Confluence.

const projectRoot = path.resolve(__dirname, '..');
const src = path.join(projectRoot, 'src', 'app');

const architecture = {
  project: 'travel-companion',
  generatedAt: new Date().toISOString(),
  components: [],
  services: [],
  apiDependencies: [
    'OpenWeather (weather)',
    'NewsAPI (news)',
    'Mapbox or OpenStreetMap (maps)'
  ],
  dataFlow: []
};

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
}

function findFiles(dir, pattern) {
  if (!fs.existsSync(dir)) return [];
  const names = fs.readdirSync(dir);
  const matches = [];
  names.forEach(name => {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      matches.push(...findFiles(p, pattern));
    } else if (pattern.test(name)) {
      matches.push(p);
    }
  });
  return matches;
}

// components
const components = findFiles(src, /\.component\.ts$/);
components.forEach(c => {
  const rel = path.relative(src, c);
  const content = safeRead(c);
  const selectorMatch = content.match(/selector:\s*['"]([a-zA-Z0-9-_.]+)['"]/);
  architecture.components.push({
    path: rel.replace(/\\/g, '/'),
    file: path.basename(c),
    selector: selectorMatch ? selectorMatch[1] : null
  });
});

// services
const services = findFiles(src, /.service.ts$/);
services.forEach(s => {
  const rel = path.relative(src, s);
  const content = safeRead(s);
  // Extract base URLs (e.g., private base = '...';)
  const baseVars = {};
  const baseRegex = /(?:private|public)\s+([a-zA-Z0-9_]+)\s*=\s*['"]([^'"]+)['"]/g;
  let baseMatch;
  while ((baseMatch = baseRegex.exec(content))) {
    baseVars[baseMatch[1]] = baseMatch[2];
  }
  // Extract endpoints
  const endpoints = [];
  // Match this.http.<method>(...)
  const httpCallRegex = /this\.http\.(get|post|put|delete|patch)\s*<[^>]*>?\s*\(([^,]+),?/g;
  let httpMatch;
  while ((httpMatch = httpCallRegex.exec(content))) {
    const method = httpMatch[1].toUpperCase();
    let urlExpr = httpMatch[2].trim();
    let url = null;
    // Try to resolve urlExpr if it's a template string or variable
    if (urlExpr.startsWith('`')) {
      // Template string: try to resolve ${this.base} or similar
      url = urlExpr.slice(1, -1).replace(/\$\{\s*this\.([a-zA-Z0-9_]+)\s*}/g, (m, v) => baseVars[v] || m);
    } else if (urlExpr.startsWith('"') || urlExpr.startsWith("'")) {
      url = urlExpr.slice(1, -1);
    } else if (/this\.[a-zA-Z0-9_]+/.test(urlExpr)) {
      // Variable reference: try to resolve
      const varName = urlExpr.replace('this.', '').replace(/[^a-zA-Z0-9_]/g, '');
      url = baseVars[varName] || urlExpr;
    } else {
      url = urlExpr;
    }
    endpoints.push({ method, url });
  }
  architecture.services.push({
    path: rel.replace(/\\/g, '/'),
    file: path.basename(s),
    endpoints
  });
});

// data flow (heuristic)
architecture.components.forEach(comp => {
  const fullPath = path.join(src, comp.path);
  const content = safeRead(fullPath);
  const usedServices = [];
  architecture.services.forEach(s => {
    const serviceName = s.file.replace('.ts', '');
    const pattern = new RegExp(serviceName, 'i');
    if (pattern.test(content)) usedServices.push(serviceName);
  });
  if (usedServices.length) {
    architecture.dataFlow.push({
      component: comp.file,
      uses: usedServices.map(u => u + ' (service)'),
      to: 'External API via service'
    });
  }
});

// write docs folder
const docsDir = path.join(projectRoot, 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir);
const outPath = path.join(docsDir, 'architecture.json');
fs.writeFileSync(outPath, JSON.stringify(architecture, null, 2), 'utf8');
console.log('Generated', outPath);
