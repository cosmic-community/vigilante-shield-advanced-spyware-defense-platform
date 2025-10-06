const fs = require('fs');
const path = require('path');

// Read the console capture script
const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Find all HTML files in the build output
const buildDir = path.join(__dirname, '..', '.next', 'server', 'app');

function injectScript(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Check if script is already injected
  if (html.includes('dashboard-console-capture')) {
    return;
  }
  
  // Inject script before closing head tag
  const scriptTag = `<script src="/dashboard-console-capture.js"></script>`;
  html = html.replace('</head>', `${scriptTag}</head>`);
  
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`✓ Injected console capture into ${htmlPath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(buildDir)) {
  walkDir(buildDir);
  console.log('✓ Console capture injection complete');
} else {
  console.log('Build directory not found. Run build first.');
}