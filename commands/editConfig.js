import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import fs from 'fs';

const CONFIG_PATH = path.join(os.homedir(), '.pgpal.env');

function editConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(" Config file not found. Run 'pgpal config init' to create it.");
    return;
  }

  const isWindows = process.platform === 'win32';
  const editor = process.env.EDITOR || (isWindows ? 'notepad' : 'nano');

  const child = spawn(editor, [CONFIG_PATH], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log("✅ Closed config editor.");
    } else {
      console.error(`❌ Editor exited with code ${code}`);
    }
  });
}

export default editConfig;

