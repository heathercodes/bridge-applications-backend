const express = require('express');

const { healthRouter } = require('../routes/health/health.router');
const { usersRouter } = require('../routes/users/users.router');
const { cohortsRouter } = require('../routes/cohort/cohort.router');
const { applicationsRouter } = require('../routes/applications/applications.router');
const { authenticateRequest, mockAuthenticate } = require('./authentication');
const { authorizeRequest } = require('./authorization');

const router = express.Router();
router.use('/', healthRouter);
router.use(authenticateRequest);
router.use(authorizeRequest);
router.use('/users', usersRouter);
router.use('/cohorts', cohortsRouter);
router.use('/applications', applicationsRouter);

module.exports = router;
