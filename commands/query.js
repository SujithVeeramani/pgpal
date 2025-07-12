import getClient from '../db/connect.js';
import { logQuery } from '../utils/logQuery.js';

async function runQuery(sql) {
  const client = getClient();
  await client.connect();

  try {
    const res = await client.query(sql);
    logQuery(sql,"query");
    console.table(res.rows);
  } catch (err) {
    console.error(" Error executing query:", err.message);
  } finally {
    await client.end();
  }
}

export default runQuery;
