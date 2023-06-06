import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { StepsType, StepsConfigType } from '@/types';
import { ACTION_NAMES } from '@/constants/cartActions';
import { FirstActiveStep, FirstPreviousStep } from '@/steps/first';
import { SecondActiveStep, SecondPreviousStep } from '@/steps/second';
import { ThirdActiveStep, ThirdPreviousStep } from '@/steps/third';

export const StepsConfig: StepsConfigType = {
  [ACTION_NAMES.FIRST_STEP_NAME]: {
    isHidden: false,
    title: '1st Title',
    activeStepComponent: FirstActiveStep,
    previousStepComponent: FirstPreviousStep,
  },
  [ACTION_NAMES.SECOND_STEP_NAME]: {
    isHidden: false,
    title: '2nd Title',
    activeStepComponent: SecondActiveStep,
    previousStepComponent: SecondPreviousStep,
  },
  [ACTION_NAMES.THIRD_STEP_NAME]: {
    isHidden: true,
    title: '3d Title',
    activeStepComponent: ThirdActiveStep,
    previousStepComponent: ThirdPreviousStep,
  },
  /* any new step */
};

export type StepsContextType = {
  activeStep: number;
  setCurrentStep: (step?: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  steps: StepsType[];
  setSteps: Dispatch<SetStateAction<StepsType[]>>;
};

export const initialState = {
  activeStep: 0,
  setCurrentStep: () => {},
  nextStep: () => {},
  previousStep: () => {},
  steps: [],
  setSteps: () => {},
};

export const StepsContext = createContext<StepsContextType>(initialState);

export const useStepsContext = (): StepsContextType => {
  return useContext(StepsContext);
};

export const StepsProvider = ({ children }: PropsWithChildren) => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState<StepsType[]>([]);

  const nextStep = useCallback(() => {
    setActiveStep((prevState) =>
      prevState < steps.length ? prevState + 1 : prevState,
    );
  }, [steps.length]);

  const previousStep = useCallback(() => {
    setActiveStep((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  }, []);

  const setCurrentStep = useCallback((step?: number) => {
    if (typeof step === 'number') {
      setActiveStep(step);
    }
  }, []);

  const value: StepsContextType = useMemo(
    () => ({
      activeStep,
      steps,
      nextStep,
      previousStep,
      setCurrentStep,
      setSteps,
    }),
    [activeStep, nextStep, previousStep, setCurrentStep, steps],
  );

  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
};
