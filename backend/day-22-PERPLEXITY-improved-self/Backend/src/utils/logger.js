import env from "../config/env.js";

export const logger = {
  info: (...args) => {
    console.log(`[INFO] [${new Date().toISOString()}]`, ...args);
  },
  warn: (...args) => {
    console.warn(`[WARN] [${new Date().toISOString()}]`, ...args);
  },
  error: (...args) => {
    console.error(`[ERROR] [${new Date().toISOString()}]`, ...args);
  },
  debug: (...args) => {
    if (env.NODE_ENV !== "production") {
      console.log(`[DEBUG] [${new Date().toISOString()}]`, ...args);
    }
  },
  logRequest: (req) => {
    logger.info(`${req.method} ${req.url}`);
    logger.debug("Headers:", req.headers);
    logger.debug("Body:", req.body);
  },
  logResponse: (req, res, took) => {
    logger.info(
      `${req.method} ${req.url} - ${res.statusCode} ${res.statusMessage} - ${took}ms`
    );
  },
  logError: (req, res, error, took) => {
    logger.error(
      `${req.method} ${req.url} - ${res.statusCode} ${res.statusMessage} - ${took}ms`
    );
    if (error) {
      logger.error(error);
    }
  },
  logRedis: (operation, key, value) => {
    logger.debug(`REDIS: ${operation} ${key}`, value);
  },
  logLLM: (service, model, operation, took, details = {}) => {
    logger.info(
      `LLM: ${service} - ${model} - ${operation} - ${took}ms`
    );
    logger.debug(`LLM Details:`, details);
  },
  logToolUse: (toolName, args, took) => {
    logger.debug(`TOOL: ${toolName} - ${took}ms`);
    logger.debug(`TOOL Args:`, args);
  },
  logToolResult: (toolName, took, result) => {
    logger.debug(`TOOL RESULT: ${toolName} - ${took}ms`);
    logger.debug(`TOOL RESULT Data:`, result);
  },
};
