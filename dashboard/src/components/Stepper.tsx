/**
 * Renders a step component with a background color based on the activeStepIndex and currentStep.
 *
 * @param {number} activeStepIndex - The index of the active step.
 * @param {number} currentStep - The index of the current step.
 * @return {JSX.Element} - The rendered step component.
 */

interface StepperProps {
  numberOfSteps: number;
  activeStepIndex: number;
}

const Stepper = ({ numberOfSteps, activeStepIndex }: StepperProps) => {
  return (
    <div className='flex space-x-1 w-full min-w-[120px] md:w-[240px]'>
      {Array.from({ length: numberOfSteps }, (_, i) => (
        <Step key={i} currentStep={i} activeStepIndex={activeStepIndex} />
      ))}
    </div>
  );
};

const Step = ({
  activeStepIndex,
  currentStep,
}: {
  activeStepIndex: number;
  currentStep: number;
}) => {
  const color =
    activeStepIndex === currentStep
      ? 'bg-slate-400'
      : activeStepIndex > currentStep
      ? 'bg-slate-800'
      : 'bg-slate-200';
  return (
    <div className={`flex flex-row flex-1 items-center space-x-2 ${color} h-1 rounded-full`}>
      &nbsp;
    </div>
  );
};

export default Stepper;
