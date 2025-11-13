const { Schema, model } = require('mongoose');
const BatteryStatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    soc: Number,
    estRangeKm: Number,
    kwhUsed: Number,
    ambientTempC: Number
  },
  { timestamps: true }
);
module.exports = model('BatteryStat', BatteryStatSchema);
