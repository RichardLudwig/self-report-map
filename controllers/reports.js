const Report = require('../models/Report');

// @desc Get all reports
// @route GET /api/v1/reports
// @access Public
exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find();

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error'});
  }
};


// @desc Create a report
// @route POST /api/v1/reports
// @access Public
exports.addReport = async (req, res, next) => {
  try {
    const report = await Report.create(req.body);

    return res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This report already exists'
      });
    } else {
      res.status(500).json({ 
        error: 'Server error'
      });
    }
  }
};