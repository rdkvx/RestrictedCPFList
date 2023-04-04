import { DataSource } from 'typeorm';
import { utilsDB } from './utils/constants';

export const databaseProviders = [
    {
    provide: utilsDB.dataSource,
    useFactory: async () => {
        const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DBHOST,
        port: utilsDB.dbPort,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}',],
        synchronize: true,
        });

        return dataSource.initialize();
    },
    },
];