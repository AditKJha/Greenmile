const express = require('express');
const cors = require('cors');
const routeRoutes = require('./routes/route.routes');
const weatherRoutes = require('./routes/weather.routes');
const batteryRoutes = require('./routes/battery.routes');
const stationsRoutes = require('./routes/stations.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const adminAuthRoutes = require('./routes/admin.auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => res.json({ ok: true, name: 'GreenMile AI API' }));
app.use('/api/auth', authRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/battery', batteryRoutes);
app.use('/api/charging-stations', stationsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

module.exports = app;
