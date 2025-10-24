'use client';

import { useState } from 'react';
import Preliminary from '@/containers/Preliminary';
import BoqForm from '@/components/BoqForm';
import BoqResults from '@/components/BoqResults';
import StageIndicator from '@/components/StageIndicator';
import { connect } from 'react-redux';
import { BoqState } from './types';
import * as actions from './actions';

interface HomepageStateProps {
  boqState: BoqState;
  preliminaryState: any;
}

interface HomepageDispatchProps {
  setFormField: (field: string, value: string) => void;
  calculateBoq: (foundationForm: any, preliminaryForm: any) => Promise<void>;
  resetForm: () => void;
  resetPreliminaryForm: () => void;
}

interface HomepageOwnProps {}

type HomepageProps = HomepageStateProps & HomepageDispatchProps & HomepageOwnProps;

function Homepage({ boqState, preliminaryState, setFormField, calculateBoq, resetForm, resetPreliminaryForm }: HomepageProps) {
  const [currentStep, setCurrentStep] = useState<'preliminary' | 'foundation' | 'result'>('preliminary');
  const [completedStages, setCompletedStages] = useState<string[]>([]);

  const handleFieldChange = (field: string, value: string) => {
    setFormField(field, value);
  };

  const handleNextToFoundation = () => {
    setCompletedStages([...completedStages, 'preliminary']);
    setCurrentStep('foundation');
  };

  const handleBackToPreliminary = () => {
    setCurrentStep('preliminary');
  };

  const handleSubmit = async () => {
    setCompletedStages([...completedStages, 'foundation']);
    await calculateBoq(boqState.form, preliminaryState.form);
    setCurrentStep('result');
  };

  const handleReset = () => {
    resetForm();
    resetPreliminaryForm();
    setCurrentStep('preliminary');
    setCompletedStages([]);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <header className="mb-6 md:mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            Planar
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white/90 mb-2 drop-shadow-md">
            Automated Construction Cost Estimates
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/80 drop-shadow-sm">
            for African Builders
          </p>
        </header>

        {/* Main Content Area - Flex layout on desktop */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Stage Indicator - Left sidebar on desktop, top on mobile */}
          {currentStep !== 'result' && (
            <StageIndicator 
              currentStage={currentStep} 
              completedStages={completedStages}
            />
          )}

          {/* Form Content - Takes remaining width */}
          <div className="flex-1 min-w-0">
            {currentStep === 'preliminary' && (
              <Preliminary onNext={handleNextToFoundation} />
            )}

            {currentStep === 'foundation' && (
              <BoqForm
                form={boqState.form}
                loading={boqState.loading}
                error={boqState.error}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onBack={handleBackToPreliminary}
              />
            )}

            {currentStep === 'result' && boqState.result && (
              <BoqResults
                result={boqState.result}
                form={{
                  projectName: preliminaryState.form.projectName,
                  buildingType: preliminaryState.form.buildingType,
                  length: boqState.form.length,
                  width: boqState.form.width,
                  location: preliminaryState.form.location,
                }}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  return {
    boqState: state.boq,
    preliminaryState: state.preliminary,
  }
};

const mapDispatchToProps = {
  ...actions,
  resetPreliminaryForm: () => ({ type: 'preliminary/RESET_FORM' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

