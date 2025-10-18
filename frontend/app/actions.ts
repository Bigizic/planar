'use client';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import * as homepage from '@/containers/Homepage/actions';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators({
    ...homepage,
  }, dispatch), [dispatch]);
};