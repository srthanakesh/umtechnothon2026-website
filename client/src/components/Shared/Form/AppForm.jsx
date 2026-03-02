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
      <form className="space-y-6 rounded-xl p-6 bg-[#1e293b] border border-white/10 shadow-[0_0_40px_rgba(76,90,182,0.25)]" onSubmit={methods.handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default AppForm;
