const express = require('express');
const router = express.Router();
const {
  calculateBoqRecord,
  getAllBoqRecords,
  getBoqRecordById,
  deleteBoqRecord
} = require('../controllers/boqController');

// POST /api/boq/calculate - Calculate BOQ and save record
router.post('/calculate', calculateBoqRecord);

// GET /api/boq/records - Get all BOQ records
router.get('/records', getAllBoqRecords);

// GET /api/boq/records/:id - Get specific BOQ record
router.get('/records/:id', getBoqRecordById);

// DELETE /api/boq/records/:id - Delete BOQ record
router.delete('/records/:id', deleteBoqRecord);

module.exports = router;
