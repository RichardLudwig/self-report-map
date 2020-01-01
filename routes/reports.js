const express = require('express');
const { getReports, addReport } = require('../controllers/reports');

const router = express.Router();

router
  .route('/')
  .get(getReports)
  .post(addReport);

module.exports = router;