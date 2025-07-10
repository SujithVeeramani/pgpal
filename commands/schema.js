import getClient from "../db/connect.js";
import Table from "cli-table3";
import chalk from "chalk";

async function showSchema(tableName, options = {}) {
  const client = getClient();
  await client.connect();

  const sql = `
    SELECT 
      table_name,
      column_name,
      data_type,
      is_nullable,
      column_default,
      character_maximum_length,
      numeric_precision,
      numeric_scale
    FROM information_schema.columns
    WHERE table_schema = 'public'
    ${tableName !== "__ALL__" ? "AND table_name = $1" : ""}
    ORDER BY table_name, ordinal_position;
  `;

  try {
    const res = await client.query(tableName !== "__ALL__" ? sql : sql.replace("AND table_name = $1", ""), tableName !== "__ALL__" ? [tableName] : []);

    if (res.rows.length === 0) {
      console.log(chalk.yellow(`⚠️  No columns found for ${tableName}`));
      return;
    }

    const grouped = {};

    for (const row of res.rows) {
      if (!grouped[row.table_name]) grouped[row.table_name] = [];
      grouped[row.table_name].push(row);
    }

    for (const [tbl, cols] of Object.entries(grouped)) {
      console.log(chalk.green(`📐 Schema for table: ${chalk.cyan(tbl)}\n`));

      const table = new Table({
        head: options.verbose
          ? ["Column", "Type", "Length", "Nullable", "Default"]
          : ["Column", "Type", "Nullable", "Default"],
      });

      cols.forEach((col) => {
        const typeDetails = col.data_type;
        const length =
          col.character_maximum_length || col.numeric_precision || "-";

        table.push(
          options.verbose
            ? [
                chalk.cyan(col.column_name),
                typeDetails,
                length,
                col.is_nullable === "YES" ? "✅" : "❌",
                col.column_default || "-",
              ]
            : [
                chalk.cyan(col.column_name),
                typeDetails,
                col.is_nullable === "YES" ? "✅" : "❌",
                col.column_default || "-",
              ]
        );
      });

      console.log(table.toString());
      console.log();
    }
  } catch (err) {
    console.error("❌ Failed to fetch schema:", err.message);
  } finally {
    await client.end();
  }
}

export default showSchema;
