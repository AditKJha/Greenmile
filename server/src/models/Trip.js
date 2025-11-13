const { Schema, model } = require('mongoose');
const TripSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    start: { type: String, required: true },
    destination: { type: String, required: true },
    distanceKm: Number,
    timeMinutes: Number,
    efficiencyScore: Number,
    energySavedKWh: Number,
    co2ReducedLb: Number,
    routeGeoJSON: Schema.Types.Mixed
  },
  { timestamps: true }
);
module.exports = model('Trip', TripSchema);
