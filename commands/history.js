import fs from 'fs';
import os from 'os';
import path from 'path';
import chalk from 'chalk';

const HISTORY_PATH = path.join(os.homedir(), '.pgpal_history.log');

function showHistory(options = {}) {
    if (options.clear) {
        try {
            if (fs.existsSync(HISTORY_PATH)) {
                fs.unlinkSync(HISTORY_PATH);
            }

            console.log(chalk.green('🧹 Query history cleared.'));
        } catch (err) {
            console.error(chalk.red('❌ Failed to clear history:'), err.message);
        }
        return;
    }

    if (!fs.existsSync(HISTORY_PATH)) {
        console.log(chalk.yellow("⚠️ No history found. Run some queries first."));
        return;
    }

    const lines = fs.readFileSync(HISTORY_PATH, 'utf-8').trim().split('\n');

    if (lines.length === 0) {
        console.log(chalk.yellow("⚠️ History file is empty."));
        return;
    }

    console.log(chalk.green("🕓 Query History:\n"));

    lines.forEach((line, index) => {
        const [ts, query] = line.split(" ::: ");
        console.log(`${chalk.gray(`#${index + 1}`)}  ${chalk.cyan(ts)}\n${query.trim()}\n`);
    });
}

export default showHistory;
