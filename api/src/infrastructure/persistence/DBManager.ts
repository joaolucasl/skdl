import { createConnection, Connection, getConnection as getTypeORMConnection } from "typeorm";
import config from 'config';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class DBManager {

    static async init() {
        const connection = await createConnection(
            config.get("server.database") as PostgresConnectionOptions
        )
    }

    public getConnection() {
        return getTypeORMConnection();
    }
}