import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

// Start the server
const server = spawn('node', ['app.js'], {
  stdio: 'inherit',
  shell: true
});

// Wait for server to be ready
await setTimeout(3000);

// Run tests
const test = spawn('npm', ['test'], {
  stdio: 'inherit',
  shell: true
});

test.on('close', (code) => {
  // Kill the server after tests complete
  server.kill();
  process.exit(code);
});
