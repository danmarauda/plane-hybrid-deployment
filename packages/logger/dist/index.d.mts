import * as winston0 from "winston";
import { LoggerOptions } from "winston";
import { RequestHandler } from "express";

//#region src/config.d.ts
declare const loggerConfig: LoggerOptions;
declare const logger: winston0.Logger;
//#endregion
//#region src/middleware.d.ts
declare const loggerMiddleware: RequestHandler;
//#endregion
export { logger, loggerConfig, loggerMiddleware };
//# sourceMappingURL=index.d.mts.map