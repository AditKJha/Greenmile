const { Schema, model } = require('mongoose');
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    prefs: {
      units: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
      ecoPriority: { type: Number, default: 0.6 }
    }
  },
  { timestamps: true }
);
module.exports = model('User', UserSchema);
