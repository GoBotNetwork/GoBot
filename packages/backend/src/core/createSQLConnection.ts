import { GoServer } from "@db/entities/GoServer";
import { GoUser } from "@db/entities/GoUser";
import { ReactionRoleMessage } from "@db/entities/ReactionRoleMessage";
import { logger } from "@utils/logger";
import { createConnection } from "typeorm";
import { typeormOrmConfig } from "../db/ormconfig";

export const createSQLConnection = async () => {
  logger.info("Creating SQL connection...");
  const conn = await createConnection(typeormOrmConfig);
  await conn.runMigrations();
  logger.info(
    `SQL connection on ${typeormOrmConfig.host}:${typeormOrmConfig.port} connected`
  );

  logger.info(`Found ${await GoUser.count()} users in database`);
  logger.info(`Found ${await GoServer.count()} servers in database`);
  logger.info(
    `Found ${await ReactionRoleMessage.count()} reaction role messages in database`
  );
};
