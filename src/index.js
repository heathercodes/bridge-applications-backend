const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./api');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/error-handler');

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = 8080;

logger.info('🤖 Initializing middleware');

app.use(bodyParser.json());
app.use(morgan('tiny', { stream: logger.stream }));
app.use('/', router);
app.use(errorHandler);

// Serve the application at the given port
app.listen(port, () => {
  logger.info(`🎧 Listening at http://localhost:${port}/`);
});
