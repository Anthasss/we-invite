export default function FormStepper({ currentStep, totalSteps, steps }) {
  return (
    <div className="flex gap-1 md:gap-2">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
            index === currentStep
              ? 'bg-secondary'
              : index < currentStep
              ? 'bg-green-500'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
