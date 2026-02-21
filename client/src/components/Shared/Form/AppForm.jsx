import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AppForm = ({ onSubmit, children, schema }) => {
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined, // Use Zod if provided
  });

  const submit = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6 border-2 border-gray-400 rounded-lg p-4 bg-[#f1f1f1]" onSubmit={methods.handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default AppForm;
