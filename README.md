# 🛠️ PgPal - PostgreSQL CLI Assistant
[![npm version](https://img.shields.io/npm/v/pgpal.svg?style=flat&color=blue)](https://www.npmjs.com/package/pgpal)

A powerful command-line interface for PostgreSQL database management, designed to make database operations simple and efficient.

## ✨ Features

- 📋 **List Tables**: View all tables in your PostgreSQL database
- 🔍 **Search**: Find tables and columns by keyword
- 📐 **Schema Inspector**: View table structures and column details
- 🗃️ **Data Export**: Dump table data to CSV or JSON formats
- 💾 **Query Runner**: Execute raw SQL queries with formatted output
- ⚙️ **Configuration Management**: Easy setup and editing of database connections
- 🐚 **Multiline Support**:Interactive SQL shell with multiline support
- 🕓 **Save you Queries**:View or clear query history from CLI

## 🚀 Installation

```bash
npm install -g pgpal
```

Or run directly with npx:
```bash
npx pgpal --help
```

## 🔧 Initial Setup

Before using PgPal, you need to configure your PostgreSQL connection:

```bash
pgpal config init
```

This will prompt you to enter your database connection details:
- **PGHOST** (default: localhost)
- **PGPORT** (default: 5432)
- **PGUSER** (default: postgres)
- **PGPASSWORD** (required)
- **PGDATABASE** (default: postgres)

Your configuration is stored securely in `~/.pgpal.env`.

## 📚 Commands

### List Tables
View all tables in your connected database:
```bash
pgpal list
```

### Search Tables & Columns
Find tables and columns containing a specific keyword:
```bash
pgpal search user
pgpal search email
```

### View Table Schema
Inspect the structure of a specific table:
```bash
pgpal schema users
pgpal schema products --verbose
```

View schema for all tables:
```bash
pgpal schema --all
```

### Export Data
Export table data to CSV or JSON:
```bash
# Export to CSV (default)
pgpal dump users

# Export to JSON
pgpal dump users --format json

# Limit rows
pgpal dump users --limit 100

# Custom output path
pgpal dump users --output ~/exports/users.csv

# Combine options
pgpal dump products --format json --limit 50 --output ./products.json
```

### Execute SQL Queries
Run raw SQL queries with formatted table output:
```bash
pgpal query "SELECT * FROM users WHERE active = true"
pgpal query "SELECT COUNT(*) FROM orders WHERE created_at > '2023-01-01'"
```
### Multiline SQL queries  
Open an interactive REPL terminal for quick SQL querying.

```bash
pgpal shell
```
### View your previously excuted Queries
Save the query exceuted from query command as well as inside the shell
Also have the option to clear the history as well 

```bash 
pgpal history            # Show all saved queries
pgpal history --clear    # Clear the query history
```

### Configuration Management
Edit your database configuration:
```bash
pgpal config edit
```

Re-initialize configuration:
```bash
pgpal config init
```

## 🔐 Security

- Database credentials are stored in `~/.pgpal.env` in your home directory
- The configuration file is not tracked by version control
- All database connections are properly closed after operations

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database access

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd pgpal

# Install dependencies
npm install

# Link for local development
npm link

# Run commands
pgpal --help
```

### Dependencies
- **commander**: CLI framework
- **pg**: PostgreSQL client
- **cli-table3**: Table formatting
- **chalk**: Terminal colors
- **dotenv**: Environment variable management

## 🎯 Usage Examples

### Database Exploration Workflow
```bash
# 1. Set up connection
pgpal config init

# 2. List all tables
pgpal list

# 3. Explore table structure
pgpal schema users --verbose

# 4. Search for specific columns
pgpal search email

# 5. Export data for analysis
pgpal dump users --limit 1000 --format json
```

### Quick Data Analysis
```bash
# Check table sizes
pgpal query "SELECT schemaname,tablename,attname,n_distinct,correlation FROM pg_stats"

# Export recent orders
pgpal dump orders --limit 100 --output recent_orders.csv

# Find user-related tables
pgpal search user
```

## 🚨 Error Handling

PgPal includes comprehensive error handling:
- Database connection failures
- Invalid SQL queries
- Missing tables or columns
- File system permissions
- Configuration errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

If you encounter any issues:
1. Check your database connection settings
2. Verify PostgreSQL server is running
3. Ensure you have proper database permissions
4. Check the configuration file at `~/.pgpal.env`
5. Check the history log at `~/.pgpal_history.log`

---
