import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  __prod__,
} from "./constants";
import { GoUser } from "./db/entity/GoUser";

export const typeormOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: !__prod__,
  entities: [GoUser]
};
