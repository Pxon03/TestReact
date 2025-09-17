const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

// Quick smoke test: load app.js into a VM and check that helper functions exist
const code = fs.readFileSync(__dirname + '/../app.js', 'utf8');
// Minimal DOM mock to satisfy app.js during VM execution
function makeMockElement() {
  return {
    innerHTML: '',
    textContent: '',
    style: {},
    className: '',
    children: [],
    appendChild(child) { this.children.push(child); },
    addEventListener() {},
  };
}

const mockDocument = {
  getElementById(id) {
    // return a mock element for any id; for inputs provide value property
    const el = makeMockElement();
    if(id === 'count') el.value = '5';
    if(id === 'submit') el.addEventListener = ()=>{};
    return el;
  },
  createElement(tag){ return makeMockElement(); }
};

const sandbox = { console, document: mockDocument };
vm.createContext(sandbox);
try{
  vm.runInContext(code, sandbox);
  console.log('app.js executed in VM — smoke OK');
  process.exit(0);
} catch(err){
  console.error('Error executing app.js in VM:', err);
  process.exit(2);
}
