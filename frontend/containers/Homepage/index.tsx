'use client';

import BoqForm from '@/components/BoqForm';
import BoqResults from '@/components/BoqResults';
import { connect } from 'react-redux';
import { BoqState } from './types';
import * as actions from './actions'

interface HomepageStateProps {
  boqState: BoqState;
}

interface HomepageDispatchProps {
  setFormField: (field: string, value: string) => void;
  calculateBoq: (formData: any) => Promise<void>;
  resetForm: () => void;
}

interface HomepageOwnProps {}

type HomepageProps = HomepageStateProps & HomepageDispatchProps & HomepageOwnProps;

function Homepage({ boqState, setFormField, calculateBoq, resetForm }: HomepageProps) {
  const handleFieldChange = (field: string, value: string) => {
    setFormField(field, value);
  };

  const handleSubmit = async () => {
    await calculateBoq(boqState.form);
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
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Hero Section */}
        <header className="mb-8 md:mb-12 text-center">
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

        {/* Cost Estimator Card */}
        <div className="max-w-6xl">
          {!boqState.result ? (
            <BoqForm
              form={boqState.form}
              loading={boqState.loading}
              error={boqState.error}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <BoqResults
              result={boqState.result}
              form={boqState.form}
              onReset={resetForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  return {
    boqState: state.boq,
  }
};

export default connect(mapStateToProps, actions)(Homepage);

