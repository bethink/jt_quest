import app from './app';
import sequelize from './models';

const port = process.env.PORT || 5005;
app.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);

  await sequelize.sync({ force: false }); // Set force to true to drop and recreate tables
  console.log('Database synchronized');
  /* eslint-enable no-console */
});
