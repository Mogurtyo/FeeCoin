const fs = require('fs');
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;

// Read JS code from file
const input = fs.readFileSync(process.argv[2], 'utf-8');

// Parse with Babel (including comments)
const ast = parser.parse(input, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
  comments: false, // This skips attaching comments
});

// Generate code without comments
const output = generate(ast, {
  comments: false,
}).code;

// Write result to stdout or overwrite file
console.log(output);
