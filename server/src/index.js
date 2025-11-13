const { PORT } = require('./config');
const { connectDB } = require('./db');
const app = require('./app');

connectDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`)))
  .catch((e) => {
    console.error('DB connect error', e);
    process.exit(1);
  });
