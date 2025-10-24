'use client';

import { Building2, MapPin, Ruler, Home, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BUILDING_TYPES, LOCATIONS, FOUNDATION_TYPES, BLOCK_WIDTHS } from '@/containers/Preliminary/constants';
import { PreliminaryFormState, RoomArea } from '@/containers/Preliminary/types';

interface PreliminaryFormProps {
  form: PreliminaryFormState;
  loading: boolean;
  error: string | null;
  onFieldChange: (field: string, value: string) => void;
  onAddRoom: () => void;
  onRemoveRoom: (roomId: string) => void;
  onUpdateRoom: (roomId: string, field: 'name' | 'area', value: string) => void;
  onNext: () => void;
}

export default function PreliminaryForm({
  form,
  loading,
  error,
  onFieldChange,
  onAddRoom,
  onRemoveRoom,
  onUpdateRoom,
  onNext,
}: PreliminaryFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid = 
    form.buildingType && 
    form.location && 
    form.foundationType && 
    form.blockWidth &&
    form.numberOfColumns &&
    form.buildingPerimeter;

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Home className="w-6 h-6" />
          Project Preliminaries
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter your project details and building specifications
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
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

          {/* Building Type and Location */}
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

          {/* Foundation Type and Block Width */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="foundationType" className="text-slate-700 font-medium">
                Foundation Type
              </Label>
              <Select
                value={form.foundationType}
                onValueChange={(value) => onFieldChange('foundationType', value)}
              >
                <SelectTrigger id="foundationType" className="border-slate-300">
                  <SelectValue placeholder="Select foundation type" />
                </SelectTrigger>
                <SelectContent>
                  {FOUNDATION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blockWidth" className="text-slate-700 font-medium">
                Block Width
              </Label>
              <Select
                value={form.blockWidth}
                onValueChange={(value) => onFieldChange('blockWidth', value)}
              >
                <SelectTrigger id="blockWidth" className="border-slate-300">
                  <SelectValue placeholder="Select block width" />
                </SelectTrigger>
                <SelectContent>
                  {BLOCK_WIDTHS.map((width) => (
                    <SelectItem key={width} value={width}>
                      {width}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Number of Columns and Building Perimeter */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numberOfColumns" className="text-slate-700 font-medium">
                Number of Columns
              </Label>
              <Input
                id="numberOfColumns"
                type="number"
                min="0"
                value={form.numberOfColumns}
                onChange={(e) => onFieldChange('numberOfColumns', e.target.value)}
                placeholder="e.g., 12"
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buildingPerimeter" className="text-slate-700 font-medium flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Building Perimeter (m)
              </Label>
              <Input
                id="buildingPerimeter"
                type="number"
                step="0.1"
                min="0"
                value={form.buildingPerimeter}
                onChange={(e) => onFieldChange('buildingPerimeter', e.target.value)}
                placeholder="e.g., 48.5"
                className="border-slate-300"
              />
            </div>
          </div>

          {/* Room Information Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Room Information</h3>
            
            <div className="space-y-4">
              {/* Number of Rooms */}
              <div className="space-y-2">
                <Label htmlFor="numberOfRooms" className="text-slate-700 font-medium">
                  Number of Rooms
                </Label>
                <Input
                  id="numberOfRooms"
                  type="number"
                  min="0"
                  value={form.numberOfRooms}
                  onChange={(e) => onFieldChange('numberOfRooms', e.target.value)}
                  placeholder="e.g., 4"
                  className="border-slate-300"
                />
              </div>

              {/* Standard Room Areas */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="livingRoomArea" className="text-slate-700 font-medium">
                    Living Room Area (m²)
                  </Label>
                  <Input
                    id="livingRoomArea"
                    type="number"
                    step="0.1"
                    min="0"
                    value={form.livingRoomArea}
                    onChange={(e) => onFieldChange('livingRoomArea', e.target.value)}
                    placeholder="e.g., 25.5"
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kitchenArea" className="text-slate-700 font-medium">
                    Kitchen Area (m²)
                  </Label>
                  <Input
                    id="kitchenArea"
                    type="number"
                    step="0.1"
                    min="0"
                    value={form.kitchenArea}
                    onChange={(e) => onFieldChange('kitchenArea', e.target.value)}
                    placeholder="e.g., 12.0"
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diningRoomArea" className="text-slate-700 font-medium">
                    Dining Room Area (m²)
                  </Label>
                  <Input
                    id="diningRoomArea"
                    type="number"
                    step="0.1"
                    min="0"
                    value={form.diningRoomArea}
                    onChange={(e) => onFieldChange('diningRoomArea', e.target.value)}
                    placeholder="e.g., 15.0"
                    className="border-slate-300"
                  />
                </div>
              </div>

              {/* Additional Rooms */}
              {form.additionalRooms.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Additional Rooms</Label>
                  {form.additionalRooms.map((room) => (
                    <div key={room.id} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <Input
                          type="text"
                          value={room.name}
                          onChange={(e) => onUpdateRoom(room.id, 'name', e.target.value)}
                          placeholder="Room name"
                          className="border-slate-300"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          value={room.area}
                          onChange={(e) => onUpdateRoom(room.id, 'area', e.target.value)}
                          placeholder="Area (m²)"
                          className="border-slate-300"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveRoom(room.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Room Button */}
              <Button
                type="button"
                variant="outline"
                onClick={onAddRoom}
                className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add More Rooms
              </Button>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 text-lg"
          >
            {loading ? 'Processing...' : 'Next: Foundation Details'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
