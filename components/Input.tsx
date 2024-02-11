import { twMerge } from "tailwind-merge";

interface InputPropTypes {
  placeholder: string;
  id: string;
  disabled?: boolean;
  styles?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  styles,
  value,
  onChange,
  id,
  disabled,
}: InputPropTypes) => {
  return (
    <input
      placeholder={placeholder}
      className={twMerge(
        "flex items-center justify-center border-[3px] border-dark-blue rounded-lg w-full p-3 focus:outline-none text-xl",
        styles
      )}
      onChange={onChange}
      id={id}
      disabled={disabled}
    ></input>
  );
};

export default Input;
