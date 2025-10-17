'use client';

import { Download, RefreshCw, FileText, Boxes, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface MaterialCalculation {
  cement: number;
  sand: number;
  gravel: number;
  water: number;
}

interface BoqResult {
  excavationVolume: number;
  blinding: MaterialCalculation;
  foundation: MaterialCalculation;
  column: MaterialCalculation;
  laborCost: number;
  recordId?: string;
}

interface BoqResultsProps {
  result: BoqResult;
  form: {
    projectName: string;
    buildingType: string;
    length: string;
    width: string;
    location: string;
  };
  onReset: () => void;
}

export default function BoqResults({ result, form, onReset }: BoqResultsProps) {
  const formatCurrency = (value: number) => {
    return `₦${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalCement = result.blinding.cement + result.foundation.cement + result.column.cement;
  const totalSand = result.blinding.sand + result.foundation.sand + result.column.sand;
  const totalGravel = result.blinding.gravel + result.foundation.gravel + result.column.gravel;
  const totalWater = result.blinding.water + result.foundation.water + result.column.water;

  const downloadCSV = () => {
    const csvContent = [
      ['Planar - Bill of Quantities'],
      ['Project Name', form.projectName],
      ['Building Type', form.buildingType],
      ['Dimensions', `${form.length}m x ${form.width}m`],
      ['Location', form.location],
      [''],
      ['EXCAVATION'],
      ['Description', 'Volume (m³)'],
      ['Excavation', result.excavationVolume],
      [''],
      ['BLINDING CONCRETE (1:3:6 Mix)'],
      ['Material', 'Quantity', 'Unit'],
      ['Cement', result.blinding.cement, 'bags'],
      ['Sand', result.blinding.sand, 'm³'],
      ['Gravel', result.blinding.gravel, 'm³'],
      ['Water', result.blinding.water, 'litres'],
      [''],
      ['FOUNDATION CONCRETE (1:2:4 Mix)'],
      ['Material', 'Quantity', 'Unit'],
      ['Cement', result.foundation.cement, 'bags'],
      ['Sand', result.foundation.sand, 'm³'],
      ['Gravel', result.foundation.gravel, 'm³'],
      ['Water', result.foundation.water, 'litres'],
      [''],
      ['COLUMN CONCRETE (1:2:4 Mix)'],
      ['Material', 'Quantity', 'Unit'],
      ['Cement', result.column.cement, 'bags'],
      ['Sand', result.column.sand, 'm³'],
      ['Gravel', result.column.gravel, 'm³'],
      ['Water', result.column.water, 'litres'],
      [''],
      ['COST SUMMARY'],
      ['Description', 'Amount (NGN)'],
      ['Labor Cost', result.laborCost],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${form.projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_boq.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6" />
                {form.projectName}
              </CardTitle>
              <CardDescription className="text-green-100">
                {form.buildingType} • {form.length}m × {form.width}m • {form.location}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-white text-green-700">
              Foundation Stage
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <Button
              onClick={downloadCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download BoQ (CSV)
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Estimate
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-blue-600" />
                Excavation
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Excavation Volume</span>
                  <span className="font-semibold text-slate-800">{result.excavationVolume} m³</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Material Requirements
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Blinding Concrete (1:3:6 Mix)</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cement</TableCell>
                        <TableCell className="text-right">{result.blinding.cement}</TableCell>
                        <TableCell className="text-right">bags</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sand</TableCell>
                        <TableCell className="text-right">{result.blinding.sand}</TableCell>
                        <TableCell className="text-right">m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gravel</TableCell>
                        <TableCell className="text-right">{result.blinding.gravel}</TableCell>
                        <TableCell className="text-right">m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Water</TableCell>
                        <TableCell className="text-right">{result.blinding.water}</TableCell>
                        <TableCell className="text-right">litres</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Foundation Concrete (1:2:4 Mix)</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cement</TableCell>
                        <TableCell className="text-right">{result.foundation.cement}</TableCell>
                        <TableCell className="text-right">bags</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sand</TableCell>
                        <TableCell className="text-right">{result.foundation.sand}</TableCell>
                        <TableCell className="text-right">m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gravel</TableCell>
                        <TableCell className="text-right">{result.foundation.gravel}</TableCell>
                        <TableCell className="text-right">m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Water</TableCell>
                        <TableCell className="text-right">{result.foundation.water}</TableCell>
                        <TableCell className="text-right">litres</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Column Concrete (1:2:4 Mix)</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cement</TableCell>
                        <TableCell className="text-right">{result.column.cement}</TableCell>
                        <TableCell className="text-right">bags</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sand</TableCell>
                        <TableCell className="text-right">{result.column.sand}</TableCell>
                        <TableCell className="text-right">m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gravel</TableCell>
                        <TableCell className="text-right">{result.column.gravel}</TableCell>
                        <TableCell className="text-right">m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Water</TableCell>
                        <TableCell className="text-right">{result.column.water}</TableCell>
                        <TableCell className="text-right">litres</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Total Material Summary</h3>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Material</TableHead>
                      <TableHead className="text-right font-semibold">Total Quantity</TableHead>
                      <TableHead className="text-right font-semibold">Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Cement</TableCell>
                      <TableCell className="text-right font-medium">{totalCement.toFixed(2)}</TableCell>
                      <TableCell className="text-right">bags</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sand</TableCell>
                      <TableCell className="text-right font-medium">{totalSand.toFixed(2)}</TableCell>
                      <TableCell className="text-right">m³</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gravel</TableCell>
                      <TableCell className="text-right font-medium">{totalGravel.toFixed(2)}</TableCell>
                      <TableCell className="text-right">m³</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Water</TableCell>
                      <TableCell className="text-right font-medium">{totalWater.toFixed(2)}</TableCell>
                      <TableCell className="text-right">litres</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Labor Cost
              </h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">Estimated Labor Cost</span>
                  <span className="text-2xl font-bold text-green-700">{formatCurrency(result.laborCost)}</span>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  Based on {form.location} rates for excavation work
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
