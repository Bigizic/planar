'use client';

import { Ruler, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FoundationFormState } from '@/containers/Homepage/types';

interface BoqFormProps {
  form: FoundationFormState;
  loading: boolean;
  error: string | null;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function BoqForm({
  form,
  loading,
  error,
  onFieldChange,
  onSubmit,
  onBack,
}: BoqFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isFormValid = form.length && form.width;

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Ruler className="w-6 h-6" />
          Foundation Works
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter foundation dimensions to calculate Bill of Quantities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-slate-300 hover:bg-slate-50 font-medium py-6 text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 text-lg"
            >
              {loading ? 'Calculating...' : 'Generate Estimate'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
