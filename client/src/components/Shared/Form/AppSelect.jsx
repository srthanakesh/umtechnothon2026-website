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
          className="block text-sm font-medium text-gray-700 mb-1"
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400
                focus:outline-2 focus:-outline-offset-2 focus:outline-[#4c5ab6] sm:text-sm/6"
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