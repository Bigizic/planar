'use client';

import { useReducer } from 'react';
import { boqReducer } from './reducer';
import { setFormField, calculateBoq } from './actions';
import BoqForm from '@/components/BoqForm';
import BoqResults from '@/components/BoqResults';

const initialState = {
  form: {
    projectName: 'Untitled Project',
    buildingType: '',
    length: '',
    width: '',
    location: '',
  },
  result: null,
  loading: false,
  error: null,
};

export default function BoqContainer() {
  const [state, dispatch] = useReducer(boqReducer, initialState);

  const handleFieldChange = (field: string, value: string) => {
    dispatch(setFormField(field, value));
  };

  const handleSubmit = async () => {
    const dispatchAsync = (action: any) => {
      if (typeof action === 'function') {
        return action(dispatch);
      }
      return dispatch(action);
    };

    await calculateBoq(state.form)(dispatchAsync);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Planar</h1>
          <p className="text-slate-600 text-lg">
            Automated Construction Cost Estimates for African Builders
          </p>
        </header>

        {!state.result ? (
          <BoqForm
            form={state.form}
            loading={state.loading}
            error={state.error}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
        ) : (
          <BoqResults
            result={state.result}
            form={state.form}
            onReset={() => dispatch({ type: 'boq/RESET_FORM' })}
          />
        )}
      </div>
    </div>
  );
}
