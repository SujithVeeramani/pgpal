import fs from 'fs';
import os from 'os';
import path from 'path';
import readline from 'readline';

const CONFIG_PATH = path.join(os.homedir(), '.pgpal.env');

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(question, (ans) => {
    rl.close();
    resolve(ans);
  }));
}

async function initConfig() {
  console.log("🔧 Let's set up your PostgreSQL config for PgPal\n");

  const host = await prompt('PGHOST (default: localhost): ') || 'localhost';
  const port = await prompt('PGPORT (default: 5432): ') || '5432';
  const user = await prompt('PGUSER (default: postgres): ') || 'postgres';
  const password = await prompt('PGPASSWORD: ');
  const database = await prompt('PGDATABASE (default: postgres): ') || 'postgres';

  const config = `
PGHOST=${host}
PGPORT=${port}
PGUSER=${user}
PGPASSWORD=${password}
PGDATABASE=${database}
`.trim();

  fs.writeFileSync(CONFIG_PATH, config);
  console.log(`\n✅ Config saved to ${CONFIG_PATH}`);
  console.log('📦 You can now run: pgpal list');
}

export default initConfig;
