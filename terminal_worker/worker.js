const { exec } = require('child_process');

/**
 * A simple terminal worker that executes shell commands. The command to run
 * should be provided as the first command-line argument. If no command is
 * provided, it defaults to listing the current directory contents. In a
 * real-world implementation this would need careful security checks and
 * sandboxing to prevent arbitrary code execution. This example is purely
 * illustrative.
 */
function runCommand() {
  const args = process.argv.slice(2);
  const cmd = args.length > 0 ? args.join(' ') : 'ls -la';
  exec(cmd, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      console.error(stderr);
      return;
    }
    console.log(stdout);
  });
}

runCommand();
