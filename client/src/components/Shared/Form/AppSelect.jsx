import { Controller, useFormContext } from "react-hook-form";

const AppSelect = ({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  showLabel = true,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      {showLabel && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#fafdff] mb-1"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <Controller
          name={name}
          render={({ field }) => (
            <select
              {...field}
              id={name}
              disabled={disabled}
              className="block w-full rounded-md bg-[#111827] px-3 py-2 text-base text-white 
                         border border-white/10 outline-none focus:ring-2 focus:ring-[#4c5ab6] 
                         sm:text-sm "
              value={field.value ?? ""}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default AppSelect;