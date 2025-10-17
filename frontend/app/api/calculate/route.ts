import { NextRequest, NextResponse } from 'next/server';
import { calculateBoq } from '@/lib/calculateBoq';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { length, width, location, buildingType, projectName } = body;

    if (!length || !width || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: length, width, location' },
        { status: 400 }
      );
    }

    const result = calculateBoq({
      length: parseFloat(length),
      width: parseFloat(width),
      location,
    });

    const perimeter = 4 * parseFloat(length);

    const record = {
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

    const { data, error } = await supabase
      .from('boq_records')
      .insert([record])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save record to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...result,
      recordId: data?.id,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
