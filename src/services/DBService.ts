import { ColumnsDescription, Sequelize } from "sequelize";

class DBService {
    constructor() {

    }

    getSequelize(connectionString: string): Sequelize {
        return new Sequelize(connectionString, {
            logging: false
        });
    }

    async getTablesInformation(connectionString: string): Promise<string[]> {
        let sequelize: Sequelize | undefined;
        try {
            sequelize = this.getSequelize(connectionString);
            const tableNames = await sequelize.getQueryInterface().showAllTables();
            return tableNames;
        }
        finally {
            if(sequelize) {
                sequelize.close();
            }
        }
    }

    async describeTable(tableName: string, connectionString: string): Promise<ColumnsDescription> {
        let sequelize: Sequelize | undefined;
        try {
            sequelize = this.getSequelize(connectionString);
            const columns = await sequelize.getQueryInterface().describeTable(tableName);
            return columns;
        }
        finally {
            if(sequelize) {
                sequelize.close();
            }
        }
    }

    async executeSQLCustomDB(sql: string, connectionString: string): Promise<any[]> {
        let sequelize: Sequelize | undefined;
        try {
            if(!sql.toLowerCase().startsWith("select")) {
                throw new Error("Only select queries are supported");
            }
            sequelize = this.getSequelize(connectionString);
            const [result] = await sequelize.query(sql);
            return result;
        }
        finally {
            if(sequelize) {
                sequelize.close();
            }
        }
    }
}

export const dbService = new DBService();