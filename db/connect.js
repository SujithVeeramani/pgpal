import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import { Client } from 'pg';



dotenv.config({ 
  path: path.join(os.homedir(), '.pgpal.env'),
  quiet: true 
});

function getClient() {
  return new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });
}

export default getClient;
