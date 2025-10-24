'use client';

import PreliminaryForm from '@/components/PreliminaryForm';
import { connect } from 'react-redux';
import { PreliminaryState } from './types';
import * as actions from './actions';

interface PreliminaryStateProps {
  preliminaryState: PreliminaryState;
}

interface PreliminaryDispatchProps {
  setPreliminaryField: (field: string, value: string) => void;
  addRoom: () => void;
  removeRoom: (roomId: string) => void;
  updateRoom: (roomId: string, field: 'name' | 'area', value: string) => void;
}

interface PreliminaryOwnProps {
  onNext: () => void;
}

type PreliminaryProps = PreliminaryStateProps & PreliminaryDispatchProps & PreliminaryOwnProps;

function Preliminary({ 
  preliminaryState, 
  setPreliminaryField,
  addRoom,
  removeRoom,
  updateRoom,
  onNext 
}: PreliminaryProps) {
  const handleFieldChange = (field: string, value: string) => {
    setPreliminaryField(field, value);
  };

  return (
    <PreliminaryForm
      form={preliminaryState.form}
      loading={preliminaryState.loading}
      error={preliminaryState.error}
      onFieldChange={handleFieldChange}
      onAddRoom={addRoom}
      onRemoveRoom={removeRoom}
      onUpdateRoom={updateRoom}
      onNext={onNext}
    />
  );
}

const mapStateToProps = (state: any) => {
  return {
    preliminaryState: state.preliminary,
  };
};

export default connect(mapStateToProps, actions)(Preliminary);
