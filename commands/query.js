import getClient from '../db/connect.js';

async function runQuery(sql) {
  const client = getClient();
  await client.connect();

  try {
    const res = await client.query(sql);
    console.table(res.rows);
  } catch (err) {
    console.error(" Error executing query:", err.message);
  } finally {
    await client.end();
  }
}

export default runQuery;
