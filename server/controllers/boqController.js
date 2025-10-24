const { calculateBoq } = require('../utils/calculateBoq');
const BoqRecord = require('../models/BoqRecord');

const calculateBoqRecord = async (req, res) => {
  try {
    const { 
      length, 
      width, 
      location, 
      buildingType, 
      projectName,
      foundationType,
      blockWidth,
      numberOfColumns,
      buildingPerimeter
    } = req.body;

    // Validate required fields
    if (!length || !width || !location) {
      return res.status(400).json({
        error: 'Missing required fields: length, width, location'
      });
    }

    // Use provided perimeter or calculate from length
    const perimeter = buildingPerimeter 
      ? parseFloat(buildingPerimeter) 
      : 4 * parseFloat(length);

    // Calculate BOQ with additional parameters
    const result = calculateBoq({
      length: parseFloat(length),
      width: parseFloat(width),
      location,
      perimeter,
      numberOfColumns: numberOfColumns ? parseInt(numberOfColumns) : undefined,
    });

    // Prepare record data
    const recordData = {
      project_name: projectName || 'Untitled Project',
      building_type: buildingType || 'One room',
      length: parseFloat(length),
      width: parseFloat(width),
      location,
      perimeter,
      excavation_volume: result.excavationVolume,
      blinding_cement: result.blinding.cement,
      blinding_sand: result.blinding.sand,
      blinding_gravel: result.blinding.gravel,
      blinding_water: result.blinding.water,
      foundation_cement: result.foundation.cement,
      foundation_sand: result.foundation.sand,
      foundation_gravel: result.foundation.gravel,
      foundation_water: result.foundation.water,
      column_cement: result.column.cement,
      column_sand: result.column.sand,
      column_gravel: result.column.gravel,
      column_water: result.column.water,
      labor_cost: result.laborCost,
    };

    // Save to database
    const record = await BoqRecord.create(recordData);

    // Return result with record ID
    res.json({
      ...result,
      recordId: record.id,
    });

  } catch (error) {
    console.error('BOQ calculation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

const getAllBoqRecords = async (req, res) => {
  try {
    const records = await BoqRecord.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(records);
  } catch (error) {
    console.error('Error fetching BOQ records:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const getBoqRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await BoqRecord.findByPk(id);
    
    if (!record) {
      return res.status(404).json({
        error: 'BOQ record not found'
      });
    }
    
    res.json(record);
  } catch (error) {
    console.error('Error fetching BOQ record:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const deleteBoqRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await BoqRecord.findByPk(id);
    
    if (!record) {
      return res.status(404).json({
        error: 'BOQ record not found'
      });
    }
    
    await record.destroy();
    res.json({ message: 'BOQ record deleted successfully' });
  } catch (error) {
    console.error('Error deleting BOQ record:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  calculateBoqRecord,
  getAllBoqRecords,
  getBoqRecordById,
  deleteBoqRecord
};
