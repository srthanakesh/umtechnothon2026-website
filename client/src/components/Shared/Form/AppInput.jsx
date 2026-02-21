import { Controller, useFormContext } from "react-hook-form";

const AppInput = ({
  type,
  name,
  label,
  placeholder,
  disabled = false,
  showLabel = true,
  showForgotPassword = false,
  onForgotPassword,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      {(showLabel || (type === "password" && showForgotPassword)) && (
        <div className="flex items-center justify-between">
          {showLabel && (
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-900"
            >
              {label}
            </label>
          )}
          {type === "password" && showForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-semibold text-[#4c5ab6] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          )}
        </div>
      )}
      <div className="mt-2">
        <Controller
          name={name}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-[#4c5ab6] sm:text-sm/6"
              value={field.value ?? ""}
            />
          )}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default AppInput;
