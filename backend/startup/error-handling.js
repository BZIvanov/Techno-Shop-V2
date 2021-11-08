module.exports = function appErrorsHandler(server) {
  process.on('uncaughtException', (error) => {
    console.log('Uncaught exception! Shutting down server and node...', error);

    server.close(() => process.exit(1));
  });

  process.on('unhandledRejection', (error) => {
    console.log('Unhandled rejection! Shutting down server and node...', error);

    server.close(() => process.exit(1));
  });
};
