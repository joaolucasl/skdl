import config from 'config';
import { createConnection, Connection, getConnection as getTypeORMConnection, Repository } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import User from './../../domain/model/User';

export class DBManager {

    static async init() {
        const connectionOptions = {
            entities: [
                User
            ],
            ...config.get("server.database")
        } as PostgresConnectionOptions

        const connection = await createConnection(connectionOptions)
    }

    public getConnection() {
        return getTypeORMConnection();
    }
}