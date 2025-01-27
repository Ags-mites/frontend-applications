import { FormCard } from "../ui";

export const FormView = ({ config, onSubmitCallback, onCancel, isEditing }) => {
  const handleSubmit = (formValues) => {
    if (onSubmitCallback) {
      onSubmitCallback(formValues, isEditing);
    }
  };

  return (
    <FormCard 
      config={config}
      onSubmitCallback={handleSubmit}
      onCancel={onCancel}
      isEditing={isEditing} 
    />
  );
};
