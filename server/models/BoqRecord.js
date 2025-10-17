const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BoqRecord = sequelize.define('BoqRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Untitled Project'
  },
  building_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'One room'
  },
  length: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  width: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perimeter: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  excavation_volume: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  blinding_cement: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  blinding_sand: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  blinding_gravel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  blinding_water: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  foundation_cement: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  foundation_sand: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  foundation_gravel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  foundation_water: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  column_cement: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  column_sand: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  column_gravel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  column_water: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  labor_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'boq_records',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BoqRecord;
