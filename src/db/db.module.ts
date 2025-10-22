import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist';
import { DatabaseService } from './db.service';

@Global()
@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}),TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres', 
          name: 'cms_db',//Notice If you don't set the 'name:' for a data source, its name is set to default. Please note that you shouldn't have multiple connections without a 'name:', or with the same name, otherwise they will get overridden.
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DB'),
          entities: [__dirname + '/entites/**'],
          migrations: [__dirname + '/migrations/*.ts'],
          synchronize: false
        }),
        inject: [ConfigService]
    })],
    providers: [DatabaseService],
    exports: [DatabaseService],
})

export class DbModule {}
