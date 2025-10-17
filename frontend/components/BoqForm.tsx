'use client';

import { Building2, MapPin, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BUILDING_TYPES, LOCATIONS } from '@/containers/BoqContainer/constants';

interface BoqFormProps {
  form: {
    projectName: string;
    buildingType: string;
    length: string;
    width: string;
    location: string;
  };
  loading: boolean;
  error: string | null;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export default function BoqForm({
  form,
  loading,
  error,
  onFieldChange,
  onSubmit,
}: BoqFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isFormValid = form.buildingType && form.length && form.width && form.location;

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Foundation Cost Estimator
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter your building details to generate a Bill of Quantities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-slate-700 font-medium">
              Project Name
            </Label>
            <Input
              id="projectName"
              type="text"
              value={form.projectName}
              onChange={(e) => onFieldChange('projectName', e.target.value)}
              placeholder="Enter project name"
              className="border-slate-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="buildingType" className="text-slate-700 font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Building Type
              </Label>
              <Select
                value={form.buildingType}
                onValueChange={(value) => onFieldChange('buildingType', value)}
              >
                <SelectTrigger id="buildingType" className="border-slate-300">
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  {BUILDING_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-700 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Select
                value={form.location}
                onValueChange={(value) => onFieldChange('location', value)}
              >
                <SelectTrigger id="location" className="border-slate-300">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-slate-700 font-medium flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Length (meters)
              </Label>
              <Input
                id="length"
                type="number"
                step="0.1"
                min="0"
                value={form.length}
                onChange={(e) => onFieldChange('length', e.target.value)}
                placeholder="e.g., 12"
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="width" className="text-slate-700 font-medium flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Width (meters)
              </Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                min="0"
                value={form.width}
                onChange={(e) => onFieldChange('width', e.target.value)}
                placeholder="e.g., 12"
                className="border-slate-300"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white font-medium py-6 text-lg"
          >
            {loading ? 'Calculating...' : 'Generate Estimate'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
