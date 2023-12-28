import app from './app';

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);

  // await sequelize.sync({ force: true }); // Set force to true to drop and recreate tables
  // console.log('Database synchronized');
  // /* eslint-enable no-console */
});
