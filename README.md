# Data MCP

Seamlessly connect your databases to AI tools. Secure, fast, and universally compatible with all MCP-enabled AI assistants.

## Features

- 🔒 **Secure Database Access** - Connect safely to your databases
- ⚡ **Lightning Fast Queries** - Optimized for performance  
- 🔗 **Universal AI Compatibility** - Works with all MCP-enabled AI assistants

## MCP Integration

### Cursor Configuration

To integrate DataMCP with Cursor, add the following configuration to your `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "northwind-database": {
      "url": "https://datamcp.io/mcp",
      "headers": {
        "connectionstring": "postgresql://postgres:postgres@northwind-database:5432/northwind"
      }
    }
  }
}
```

#### Configuration Options

| Parameter | Description | Example |
|-----------|-------------|---------|
| `url` | DataMCP server endpoint | `https://datamcp.io/mcp` |
| `connectionstring` | Database connection string | `postgresql://user:pass@192.168.68.202:30001/1` |

#### Supported Database Types

- **PostgreSQL**: `postgresql://user:pass@host:port/database`
- **MySQL**: `mysql://user:pass@host:port/database` 
- **SQL Server**: `mssql://user:pass@host:port/database`

### Usage in Cursor

Once configured, you can use natural language to interact with your database:

```
# Query examples:
"Show me all users"
"Get products with price > 100"
"Export customer data to CSV"
"What's the schema of the orders table?"
```

### Available MCP Tools

The DataMCP server provides the following tools:

- `list_tables` - Get all tables in the database
- `describe_table` - View table schema and structure
- `read_query` - Execute SELECT queries
- `export_query` - Export query results to CSV/JSON

## Getting Started

1. **Deploy the DataMCP server** (see deployment instructions below)
2. **Configure Cursor** with your database connection
3. **Start querying** your database with natural language

## Deployment

### Docker

```bash
# Build the image
make build

# Run locally
docker run -p 3000:3000 datamcp

# Or run with docker-compose
docker-compose up -d
```

### Kubernetes

```bash
# Deploy to Kubernetes
kubectl apply -f k8s/
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Security

- All database connections are encrypted
- Connection strings are securely handled
- No data is stored on DataMCP servers
- Direct database communication

## Support

For issues, questions, or feature requests, please visit our [GitHub repository](https://github.com/your-org/datamcp).