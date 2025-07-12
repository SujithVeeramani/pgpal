#!/usr/bin/env node


import { Command } from "commander";
import chalk from "chalk";
import listTables from "./commands/listTable.js";
import initConfig from "./commands/initConfig.js";
import editConfig from "./commands/editConfig.js";
import runQuery from './commands/query.js';
import dumpTable from './commands/dump.js';
import searchKeyword from './commands/search.js';
import showSchema from './commands/schema.js';
import shellMode from './commands/shell.js';


const program = new Command();

program
  .name("pgpal")
  .description("🛠️ PgPal – PostgreSQL CLI Assistant")
  .version("1.0.2");

program
  .command("list")
  .description("List all tables in the connected Postgres DB")
  .action(() => {
    console.log(chalk.green("📋 Fetching tables...\n"));
    listTables();
  });

program
  .command("query")
  .description("Run a raw SQL query")
  .argument("<sql>", "The SQL query to run")
  .action((sql) => {
    runQuery(sql);
  });


program
  .command("dump")
  .description("Export table data to CSV or JSON")
  .argument("<table>", "Table name")
  .option("--format <format>", "csv or json", "csv")
  .option("--limit <number>", "Limit number of rows")
  .option("--output <path>", "File path to save output")
  .action((table, options) => {
    const { format, limit, output } = options;
    dumpTable(table, format, limit, output);
  });


program
  .command("search")
  .description("Search for matching table or column names")
  .argument("<keyword>", "Keyword to search for (case-insensitive)")
  .action((keyword) => {
    searchKeyword(keyword);
  });



program
  .command("schema")
  .description("View the structure/schema of a table")
  .argument("[table]", "Table name to inspect (use --all for all tables)")
  .option("--verbose", "Show extra info like character length")
  .option("--all", "Show schema for all public tables")
  .action((table, options) => {
    const target = options.all ? "__ALL__" : table;
    if (!target) {
      console.error("❌ Please provide a table name or use --all");
      return;
    }
    showSchema(target, options);
  });

program
  .command("shell")
  .description("Interactive SQL shell (REPL mode)")
  .action(() => {
    shellMode();
  });

const config = new Command("config").description("Manage PgPal DB configuration");

config
  .command("init")
  .description("Initialize a .pgpal.env config file")
  .action(() => initConfig());

config
  .command("edit")
  .description("Edit your .pgpal.env config file")
  .action(() => editConfig());

program.addCommand(config);

program.parse(process.argv);
