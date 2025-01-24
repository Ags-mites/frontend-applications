import { FormCard } from "../ui";

export const FormView = ({ config, onSubmitCallback, onCancel }) => {
  const handleSubmit = (formValues) => {
    if (onSubmitCallback) {
      onSubmitCallback(formValues);
    }
  };

  return (
    <FormCard 
      config={config} 
      onSubmitCallback={handleSubmit}
      onCancel={onCancel}
    />
  );
};