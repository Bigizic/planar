const TRENCH_WIDTH = 0.6;
const TRENCH_DEPTH = 1.0;
const BLINDING_THICKNESS = 0.05;
const FOUNDATION_THICKNESS = 0.15;
const DRY_VOLUME_FACTOR = 1.54;

const CEMENT_BAG_VOLUME = 0.035;
const SAND_DENSITY = 1600;
const GRAVEL_DENSITY = 1700;
const WATER_PER_CEMENT_BAG = 0.5 * 50;

const COLUMN_DEPTH = 0.75;
const COLUMN_WIDTH = 0.225;
const NUM_COLUMNS = 4;

const LABOR_COST_PER_M3 = {
  Lagos: 4000,
  Abuja: 3800,
  PortHarcourt: 3700,
  Ibadan: 3500,
  Kano: 3200,
  default: 3500,
};

function calculateMaterials(
  dryVolume,
  cementRatio,
  sandRatio,
  gravelRatio
) {
  const totalRatio = cementRatio + sandRatio + gravelRatio;

  const cement = ((cementRatio / totalRatio) * dryVolume) / CEMENT_BAG_VOLUME;
  const sand = ((sandRatio / totalRatio) * dryVolume) * (SAND_DENSITY / 1000);
  const gravel = ((gravelRatio / totalRatio) * dryVolume) * (GRAVEL_DENSITY / 1000);
  const water = cement * WATER_PER_CEMENT_BAG;

  return {
    cement: parseFloat(cement.toFixed(2)),
    sand: parseFloat(sand.toFixed(2)),
    gravel: parseFloat(gravel.toFixed(2)),
    water: parseFloat(water.toFixed(2)),
  };
}

function calculateBoq(input) {
  const { length, width, location, perimeter: inputPerimeter, numberOfColumns } = input;

  // Use provided perimeter or calculate from length
  const perimeter = inputPerimeter || (4 * length);

  const excavationVolume = parseFloat((perimeter * TRENCH_WIDTH * TRENCH_DEPTH).toFixed(2));

  const blindingVolume = perimeter * TRENCH_WIDTH * BLINDING_THICKNESS;
  const blindingDryVolume = blindingVolume * DRY_VOLUME_FACTOR;
  const blinding = calculateMaterials(blindingDryVolume, 1, 3, 6);

  const foundationVolume = perimeter * TRENCH_WIDTH * FOUNDATION_THICKNESS;
  const foundationDryVolume = foundationVolume * DRY_VOLUME_FACTOR;
  const foundation = calculateMaterials(foundationDryVolume, 1, 2, 4);

  // Use provided numberOfColumns or default
  const numColumns = numberOfColumns || NUM_COLUMNS;
  const columnVolume = COLUMN_DEPTH * COLUMN_WIDTH * COLUMN_WIDTH * numColumns;
  const columnDryVolume = columnVolume * DRY_VOLUME_FACTOR;
  const column = calculateMaterials(columnDryVolume, 1, 2, 4);

  const laborRate = LABOR_COST_PER_M3[location] || LABOR_COST_PER_M3.default;
  const laborCost = parseFloat((laborRate * excavationVolume).toFixed(2));

  return {
    excavationVolume,
    blinding,
    foundation,
    column,
    laborCost,
  };
}

module.exports = {
  calculateBoq,
  calculateMaterials
};
