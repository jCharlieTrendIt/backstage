import { useContext } from 'react';
import { LoaderContext, LoaderContextType } from '../LoaderContext';

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
