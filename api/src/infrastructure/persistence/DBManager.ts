import config from 'config';
import { createConnection, Connection, getConnection as getTypeORMConnection, Repository, EntitySchema } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import Login from '../../domain/model/Login';
import Provider from '../../domain/model/Provider';
import Patient from '../../domain/model/Patient';
import TimeSlot from '../../domain/model/TimeSlot';

export class DBManager {
    static entities = [
        Login,
        Patient,
        Provider,
        TimeSlot
    ]

    static async init() {
        const connectionOptions = {
            entities: DBManager.entities,
            ...config.get("server.database")
        } as PostgresConnectionOptions

        const connection = await createConnection(connectionOptions)
    }

    public getConnection() {
        return getTypeORMConnection();
    }
}