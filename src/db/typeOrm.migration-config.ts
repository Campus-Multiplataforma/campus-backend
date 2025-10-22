import { ConfigService } from "@nestjs/config/dist";
import { config } from "dotenv";
import { DataSourceOptions, DataSource } from "typeorm";

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  name: 'cms_db',// Notice If you don't set the 'name:' for a data source, its name is set to default. Please note that you shouldn't have multiple connections without a 'name:', or with the same name, otherwise they will get overridden.
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DB'),
  entities: [],
  migrations: [__dirname + '/migrations/*.ts'],
}

export default new DataSource(dataSourceOptions);