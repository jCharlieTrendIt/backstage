import { createContext } from 'react';

export interface LoaderContextType {
  show: boolean;
  texts: {
    topText: string;
    bottomText: string;
  };
  handleChangeText: (texts: { topText?: string; bottomText?: string }) => void;
  handleShowLoader: (show: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined,
);
