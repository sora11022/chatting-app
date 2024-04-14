const accountRouter = require('./account.router');
const viewRouter = require('./view.router');

module.exports = (app) => {
  app.use('/api/accounts', accountRouter);
  app.use('/', viewRouter);
};
