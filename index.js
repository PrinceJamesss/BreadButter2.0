require('dotenv').config();

/* Import our client structure */
const { Bot } = require('./src/struct/Bot');
/* Call our start function to load the bot instance */
(async () => await new Bot().start(process.env.TOKEN))();

process.on("unhandledRejection", async (err) => {
    console.error("Unhandled Promise Rejection:\n", err);
  });
  process.on("uncaughtException", async (err) => {
    console.error("Uncaught Promise Exception:\n", err);
  });
  process.on("uncaughtExceptionMonitor", async (err) => {
    console.error("Uncaught Promise Exception (Monitor):\n", err);
  });
  process.on("multipleResolves", async (type, promise, reason) => {
    console.error("Multiple Resolves:\n", type, promise, reason);
  });