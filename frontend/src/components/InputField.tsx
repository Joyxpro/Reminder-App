<<<<<<< HEAD
import { ChangeEvent } from "react";
import Tooltip from "./Tooltip";
=======
import Tooltip from "./ToolTip";

>>>>>>> 7cc700bd7f2b7f5604b1541ea2a0b164dc41129c

interface InputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
<<<<<<< HEAD
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
=======
>>>>>>> 7cc700bd7f2b7f5604b1541ea2a0b164dc41129c
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  required,
<<<<<<< HEAD
  name,
  onChange,
=======
>>>>>>> 7cc700bd7f2b7f5604b1541ea2a0b164dc41129c
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full">
        {/* Label and Asterisk */}
        <label className="text-slate-900 mb-2 flex items-center gap-1">
          {label}
          {required && <span className="text-red-700 text-xl">*</span>}
        </label>

        {/* Tooltip at the Far End */}
        {required && <Tooltip />}
      </div>

      {/* Input Field */}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
<<<<<<< HEAD
        onChange={onChange}
        name={name}
=======
>>>>>>> 7cc700bd7f2b7f5604b1541ea2a0b164dc41129c
        className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
      />
    </div>
  );
};

export default InputField;
