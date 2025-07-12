import fs from 'fs';
import os from 'os';
import path from 'path';

const HISTORY_PATH = path.join(os.homedir(), '.pgpal_history.log');

export function logQuery(queryText,source) {
  const timestamp = new Date().toISOString();
  let entry ;
  if(source==="shell"){
     entry = `${timestamp}|| Executed Inside Shell ::: ${queryText.trim()}\n`;
  }
  else{
     entry = `${timestamp} || Exceuted Using Query ::: ${queryText.trim()}\n`;
  }

  fs.appendFile(HISTORY_PATH, entry, (err) => {
    if (err) {
    }
  });
}
