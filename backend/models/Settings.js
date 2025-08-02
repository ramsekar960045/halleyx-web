const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  logo: String,
  primaryColor: String,
  secondaryColor: String,
  fontFamily: String,
  dashboardHTML: String
});

module.exports = mongoose.model('Settings', settingsSchema);