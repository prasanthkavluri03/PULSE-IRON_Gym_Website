const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously' });
const window = dom.window;
const document = window.document;

// Execute app.js in jsdom
const script = document.createElement('script');
script.textContent = js;
document.body.appendChild(script);

// Trigger DOMContentLoaded
document.dispatchEvent(new window.Event('DOMContentLoaded'));

// Find button and modal
const btn = document.getElementById('openPitchModal');
const modal = document.getElementById('pitchModal');

console.log('Button found:', !!btn);
console.log('Modal found:', !!modal);
console.log('Modal classes before click:', modal.className);

// Simulate click
if (btn) {
  btn.click();
}

console.log('Modal classes after click:', modal.className);
