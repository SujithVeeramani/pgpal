import getClient from "../db/connect.js";
import Table from "cli-table3";
import chalk from "chalk";

async function listTables() {
  const client = getClient();
  await client.connect();

  const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE';
  `;

  try {
    const res = await client.query(query);
    const table = new Table({ head: ["📦 Table Name"] });
    res.rows.forEach((row) => table.push([chalk.cyan(row.table_name)]));
    console.log(table.toString());
  } catch (err) {
    console.error(chalk.red("❌ Error:"), err.message);
  } finally {
    await client.end();
  }
}

export default listTables;
