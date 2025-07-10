import fs from "fs";
import getClient from "../db/connect.js";
import path from "path";

async function dumpTable(tableName, format = "csv", limit = null, outputPath = null) {
  const client = getClient();
  await client.connect();

  const limitClause = limit ? `LIMIT ${limit}` : "";
  const query = `SELECT * FROM ${tableName} ${limitClause};`;

  try {
    const res = await client.query(query);
    const rows = res.rows;

    if (!outputPath) {
      outputPath = path.join(process.cwd(), `${tableName}_dump.${format}`);
    }

    if (format === "json") {
      fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2));
    } else {
      const headers = Object.keys(rows[0]);
      const csv = [
        headers.join(","),
        ...rows.map(row =>
          headers.map(h => JSON.stringify(row[h] ?? "")).join(",")
        ),
      ].join("\n");

      fs.writeFileSync(outputPath, csv);
    }

    console.log(`✅ Data dumped to: ${outputPath}`);
  } catch (err) {
    console.error("❌ Failed to dump table:", err.message);
  } finally {
    await client.end();
  }
}

export default dumpTable;
