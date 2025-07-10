import getClient from "../db/connect.js";
import chalk from "chalk";

async function searchKeyword(keyword) {
  const client = getClient();
  await client.connect();

  const sql = `
    SELECT 
      table_name, 
      column_name 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND column_name ILIKE $1
    ORDER BY table_name;
  `;

  try {
    const res = await client.query(sql, [`%${keyword}%`]);

    if (res.rows.length === 0) {
      console.log(chalk.yellow(`No matches found for "${keyword}"`));
      return;
    }

    const grouped = {};
    for (const row of res.rows) {
      if (!grouped[row.table_name]) {
        grouped[row.table_name] = [];
      }
      grouped[row.table_name].push(row.column_name);
    }

    console.log(chalk.green(`🔍 Found matches for "${keyword}":\n`));
    for (const [table, columns] of Object.entries(grouped)) {
      console.log(`${chalk.bold("📦 Table:")} ${chalk.cyan(table)}`);
      columns.forEach((col) =>
        console.log(`   → Column: ${chalk.magenta(col)}`)
      );
      console.log();
    }
  } catch (err) {
    console.error("Search failed:", err.message);
  } finally {
    await client.end();
  }
}

export default searchKeyword;
