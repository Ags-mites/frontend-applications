import { FormCard } from "../ui";

export const FormView = ({ config, onSubmitCallback, onCancel, isEditing, formValidations }) => {
  const handleSubmit = (formValues) => {
    if (onSubmitCallback) {
      onSubmitCallback(formValues, isEditing);
    }
  };

  return (
    <FormCard 
      config={config}
      formValidations={formValidations}
      onSubmitCallback={handleSubmit}
      onCancel={onCancel}
      isEditing={isEditing} 
    />
  );
};
