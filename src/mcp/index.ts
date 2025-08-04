
import { Request, Response, Express } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from "zod";
import { dbService } from '../services/DBService';
import { connect } from 'http2';
import { convertToCSV } from './formatUtils';


const getServer = (connectionString: string) => {
    const mcpServer = new McpServer({
        name: 'datame-mcp-server',
        version: '1.0.0',
        tools: []
    });

    mcpServer.registerTool("list_tables",
        {
            description: "Get a list of all tables in the database",
        },
        async () => {
            const result = await dbService.getTablesInformation(connectionString);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
                isError: false,
            };
        }
    );

    mcpServer.registerTool("export_query", {
        description: "Export query results to various formats (CSV, JSON)",
        inputSchema: {
            query: z.string().describe("SELECT sql statment"),
            format: z.enum(["csv", "json"]).describe("The format to export the query results in"),
        },
    }, async (props: any) => {
        const result = await dbService.executeSQLCustomDB(props.query, connectionString);
        if(props.format === "csv") {
            return {
                content: [{ type: "text", text: convertToCSV(result) }],
                isError: false,
            };
        }

        //return json if not CSV, not other formats supported yet
        return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            isError: false,
        };
    });

    // Tool that uses LLM sampling to summarize any text
    mcpServer.registerTool("read_query",
    {
        description: "Execute SELECT queries to read data from the database",
        inputSchema: {
            query: z.string().describe("SELECT sql statment"),
        },
    },
    async (props) => {
        const result = await dbService.executeSQLCustomDB(props.query, connectionString);
        return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            isError: false,
        };
    });

    mcpServer.registerTool("describe_table", {
        description: "View schema information for a specific table",
        inputSchema: {
            table: z.string().describe("The name of the table to describe"),
        },
    }, async ({ table }) => {
        // Check if table exists
        const tableDescription = await dbService.describeTable(table, connectionString);
        return {
            content: [{ type: "text", text: JSON.stringify(tableDescription, null, 2) }],
            isError: false,
        };
    });

    return mcpServer;
}

export const initMcpServer = (app: Express) => {
    app.post('/mcp', async (req: Request, res: Response) => {   
        try {
            var connectionString = req.headers["connectionstring"] as string;
            if (!connectionString) {
                throw new Error('Connection string is required');
            }
            const server = getServer(connectionString); 
                const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: undefined,
                });
                res.on('close', () => {
                transport.close();

                });
                await server.connect(transport);
                await transport.handleRequest(req, res, req.body);
            } catch (error) {
                console.error('Error handling MCP request:', error);
                if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                    code: -32603,
                    message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    });

    // SSE notifications not supported in stateless mode
    app.get('/mcp', async (req: Request, res: Response) => {
        console.log('Received GET MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
            code: -32000,
            message: "Method not allowed."
            },
            id: null
        }));
    });

    // Session termination not needed in stateless mode
    app.delete('/mcp', async (req: Request, res: Response) => {
        console.log('Received DELETE MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
            code: -32000,
            message: "Method not allowed."
            },
            id: null
        }));
    });
}







