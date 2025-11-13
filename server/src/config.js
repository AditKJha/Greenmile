require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/greenmile',
  MAPBOX_TOKEN: process.env.MAPBOX_TOKEN || '',
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || '',
  OPENCHARGEMAP_API_KEY: process.env.OPENCHARGEMAP_API_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey123',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || ''
};
