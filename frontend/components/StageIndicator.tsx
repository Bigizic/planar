'use client';

import { Check } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  label: string;
}

interface StageIndicatorProps {
  currentStage: string;
  completedStages: string[];
}

const stages: Stage[] = [
  { id: 'preliminary', name: 'Preliminaries', label: 'Project Preliminaries' },
  { id: 'foundation', name: 'Foundation Works', label: 'Foundation Works' },
  { id: 'superstructure', name: 'Superstructure', label: 'Superstructure' },
  { id: 'roofing', name: 'Roofing Stage', label: 'Roofing Stage' },
  { id: 'plastering', name: 'Plastering & Screeding', label: 'Plastering & Screeding' },
  { id: 'tiling', name: 'Tiling & Painting', label: 'Tiling & Painting' },
  { id: 'fittings', name: 'Doors, Windows & Fittings', label: 'Doors, Windows & Fittings' },
  { id: 'plumbing', name: 'Plumbing & Electrical', label: 'Plumbing & Electrical' },
  { id: 'mechanical', name: 'Mechanical & Drainage', label: 'Mechanical & Drainage' },
];

export default function StageIndicator({ currentStage, completedStages }: StageIndicatorProps) {
  const getCurrentStageIndex = () => {
    return stages.findIndex(stage => stage.id === currentStage);
  };

  const isCompleted = (stageId: string) => {
    return completedStages.includes(stageId);
  };

  const isCurrent = (stageId: string) => {
    return currentStage === stageId;
  };

  return (
    <>
      {/* Mobile View - Compact at top */}
      <div className="md:hidden mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
          <div className="text-sm text-slate-600 mb-2">Current Stage</div>
          <div className="flex items-center gap-3">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${isCurrent(currentStage) ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}
            `}>
              {getCurrentStageIndex() + 1}
            </div>
            <div>
              <div className="font-semibold text-slate-800">
                {stages.find(s => s.id === currentStage)?.label || 'Unknown Stage'}
              </div>
              <div className="text-sm text-slate-500">
                Step {getCurrentStageIndex() + 1} of {stages.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View - Vertical Sidebar (Static, not fixed) */}
      <div className="hidden md:block w-56 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-lg p-4 border border-slate-200 sticky top-24">
          <div className="flex flex-col gap-3">
            {stages.map((stage, index) => {
              const isActive = isCurrent(stage.id);
              const isDone = isCompleted(stage.id);
              const isLast = index === stages.length - 1;

              return (
                <div key={stage.id} className="flex flex-col items-start">
                  {/* Stage Item */}
                  <div className="flex items-center gap-3">
                    {/* Circle */}
                    <div
                      className={`
                        w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all flex-shrink-0
                        ${isActive 
                          ? 'bg-blue-600 text-white ring-2 ring-blue-200' 
                          : isDone 
                            ? 'bg-green-600 text-white' 
                            : 'bg-slate-200 text-slate-600'
                        }
                      `}
                    >
                      {isDone ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Label */}
                    <div
                      className={`
                        text-xs font-medium transition-colors whitespace-nowrap
                        ${isActive 
                          ? 'text-blue-600 font-semibold' 
                          : isDone 
                            ? 'text-green-600' 
                            : 'text-slate-500'
                        }
                      `}
                    >
                      {stage.name}
                    </div>
                  </div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div
                      className={`
                        w-0.5 h-6 ml-3 rounded transition-colors
                        ${isDone 
                          ? 'bg-green-600' 
                          : isActive 
                            ? 'bg-blue-300' 
                            : 'bg-slate-200'
                        }
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
