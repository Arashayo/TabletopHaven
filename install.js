const { spawn } = require('child_process');
const path = require('path');

const runCommand = (command, args, directory) => {
  return new Promise((resolve, reject) => {
    const fullDirectory = path.join(__dirname, directory);
    const spawned = spawn(command, args, { cwd: fullDirectory, stdio: 'inherit', shell: true });

    spawned.on('error', reject);
    spawned.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`"${command}" process exited with code ${code}`);
      }
    });
  });
};

const main = async () => {
  try {
    // Install dependencies in frontend and backend
    await runCommand('npm', ['install'], './frontend');
    await runCommand('npm', ['install'], './backend');

    // Run createTables.js and fillGames.js in the backend
    await runCommand('node', ['createTables.js'], './backend/src');
    await runCommand('node', ['fillGames.js'], './backend/src');

    console.log('All tasks completed successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

main();
