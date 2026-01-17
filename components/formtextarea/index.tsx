import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  rows?: number;
};

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  register,
  error,
  rows = 4,
}: FormTextareaProps<T>) {

  return (
    <div className="flex flex-col w-full py-2">
      <label className="w-full" >
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder=" "
        {...register(name)}
        className={`
          peer w-full bg-transparent border-0 border-b-2
          ${error ? "border-red-500 focus:border-red-500 " : "border-gray-400 focus:border-blue-500 "}
          focus:outline-none
          text-sm transition-colors
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
