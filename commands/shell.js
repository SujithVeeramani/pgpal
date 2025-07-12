import readline from "readline";
import getClient from "../db/connect.js";
import chalk from "chalk";

async function shellMode() {
  const client = getClient();
  try {
    await client.connect();
  } catch (err) {
    console.error(chalk.red("❌ Could not connect to PostgreSQL:"));
    console.error(err.message);
    process.exit(1);
  }

  console.log(chalk.green("🧠 PgPal Shell – type SQL queries below"));
  console.log(chalk.gray("Type \\exit to quit\n"));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.cyan("pgpal> "),
  });

  let queryBuffer = "";

  rl.prompt();

  rl.on("line", async (line) => {
    if (line.trim() === "\\exit") {
      rl.close();
      return;
    }

    queryBuffer += " " + line;

    if (queryBuffer.trim().endsWith(";")) {
      try {
        const result = await client.query(queryBuffer.trim());
        console.log(chalk.yellow("→ Rows:"), result.rowCount);
        console.table(result.rows);
      } catch (err) {
        console.error(chalk.red("❌ Query Error:"), err.message);
      }
      queryBuffer = "";
    }

    rl.prompt();
  });

  rl.on("close", async () => {
    await client.end();
    console.log(chalk.green("👋 Exiting PgPal shell. Bye!"));
    process.exit(0);
  });
}

export default shellMode;
