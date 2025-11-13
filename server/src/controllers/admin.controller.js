const User = require('../models/User');
const Trip = require('../models/Trip');

async function listUsers(req, res){
  const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).limit(500);
  res.json({ count: users.length, items: users });
}

async function deleteUser(req, res){
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  await Trip.deleteMany({ userId: id });
  res.json({ ok: true });
}

async function listTrips(req, res){
  const trips = await Trip.find().sort({ createdAt: -1 }).limit(500);
  res.json({ count: trips.length, items: trips });
}

async function metrics(req, res){
  const [usersCount, tripsCount] = await Promise.all([
    User.countDocuments(),
    Trip.countDocuments()
  ]);

  const agg = await Trip.aggregate([
    { $group: {
        _id: null,
        totalEnergySavedKWh: { $sum: { $ifNull: ["$energySavedKWh", 0] } },
        avgEfficiency: { $avg: { $ifNull: ["$efficiencyScore", 0] } },
        totalCO2Lb: { $sum: { $ifNull: ["$co2ReducedLb", 0] } }
    }}
  ]);
  const m = agg[0] || { totalEnergySavedKWh: 0, avgEfficiency: 0, totalCO2Lb: 0 };

  // Weekly snapshots (last 12 weeks) (labels e.g., Jan 07 etc.)
  const weekly = await Trip.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          week: { $week: "$createdAt" }
        },
        trips: { $sum: 1 },
        kwh: { $sum: { $ifNull: ["$energySavedKWh", 0] } }
      }
    },
    { $sort: { "_id.year": -1, "_id.week": -1 } },
    { $limit: 12 }
  ]);

  // format labels (approximate Monday of the week)
  function weekLabel(year, week){
    // simple label year-week turned into 'Mon Jan 07' style
    return `W${week} ${year}`;
  }
  const weeklyOut = weekly.reverse().map(w => ({
    label: weekLabel(w._id.year, w._id.week),
    newUsers: 0,   // optional to extend later
    trips: w.trips,
    kwh: Number((w.kwh||0).toFixed(2))
  }));

  res.json({
    usersCount,
    tripsCount,
    totalEnergySavedKWh: Number(m.totalEnergySavedKWh?.toFixed?.(2) || 0),
    avgEfficiency: Math.round(m.avgEfficiency||0),
    totalCO2Lb: Number(m.totalCO2Lb?.toFixed?.(2) || 0),
    weekly: weeklyOut
  });
}

module.exports = { listUsers, deleteUser, listTrips, metrics };
