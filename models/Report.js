const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const ReportSchema = new mongoose.Schema({
  // All part 1 and 2 index crime options from UCR
  // needs to be predetermined to ensure accuracy/precision
  crime: {
    type: String,
    required: [true, 'Select a crime option'],
    enum: ['Arson', 'Assault (aggravated)', 'Assault (simple)', 'Burglary (breaking or entering)','Criminal homicide', 'Curfew violations/loitering (under 18)', 'Disorderly conduct', 'Driving under the influence', 'Drug abuse violations', 'Drunkenness', 'Embezzlement', 'Forgery/counterfeiting', 'Fraud', 'Gambling', 'Larceny-theft', 'Liquor laws', 'Motor vehicle theft', 'Offenses against the family/children', 'Other', 'Prostitution/commercialized vice', 'Rape (forcible)', 'Robbery', 'Runaways (under 18)', 'Sex offenses', 'Stolen property', 'Vagrancy', 'Vandalism', 'Weapons'],
    trim: true,
  },
  // geogjson location of crime
  address: {
    type: String,
    required: [true, 'Enter an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  // date of crime
  date: {
    type: String,
    required: [true, 'Enter date in MM/DD/YYYY format please.'],
    maxlength: [10, 'For example, "01/31/2018"'],
    trim: true
  },
  // time of crime
  time: {
    type: String,
    required: [true, 'Enter time in 24 hour time format.'],
    maxlength: [5, 'For example, "22:35".'],
    trim: true
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode and create location
ReportSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Report', ReportSchema);