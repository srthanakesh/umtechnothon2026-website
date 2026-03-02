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
              className="block text-sm font-medium text-white/80"
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
              className="block w-full rounded-md bg-[#111827] px-3 py-2 text-base text-white 
                border border-white/10 placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-[#4c5ab6] 
                sm:text-sm"
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
