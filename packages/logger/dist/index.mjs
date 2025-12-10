import { createLogger, format, transports } from "winston";
import expressWinston from "express-winston";

//#region src/config.ts
const loggerConfig = {
	level: process.env.LOG_LEVEL || "info",
	format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), format.json()),
	transports: [new transports.Console()]
};
const logger = createLogger(loggerConfig);

//#endregion
//#region src/middleware.ts
const loggerMiddleware = expressWinston.logger({
	...loggerConfig,
	transports: [new transports.Console()],
	msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
	expressFormat: true
});

//#endregion
export { logger, loggerConfig, loggerMiddleware };
//# sourceMappingURL=index.mjs.map