import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: string;
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = "text",
}: FormInputProps<T>) {
  
  return (
    <div className="flex flex-col gap-0.5 w-full">
      
      <label className="w-full">
        {label}
      </label>

      <input
        type={type}
        placeholder=" "
        {...register(name)}
        className={`peer w-full bg-transparent border-0 border-b-2
          ${error ? "border-red-500 focus:border-red-500 " : "border-gray-400 focus:border-blue-500 "}
          focus:outline-none transition-colors
        `}
      />

      {error && (
        <span className="text-xs text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
}
