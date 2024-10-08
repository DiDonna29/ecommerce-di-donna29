import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  types: ['node', 'express', 'multer'],
  autoLoadEntities: true,
  synchronize: true,
  // dropSchema: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

console.log('host', `${process.env.DB_HOST}`);
console.log('port', `${process.env.DB_PORT}`);
console.log('username', `${process.env.DB_USERNAME}`);
console.log('password', `${process.env.DB_PASSWORD}`);
console.log('database', `${process.env.DB_NAME}`);
