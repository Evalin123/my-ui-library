import React, { ReactNode } from "react";
import classNames from "classnames";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  checked?: boolean;
  disabled?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  label,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <label
      className={classNames(
        "inline-flex items-center space-x-2 cursor-pointer",
        { "opacity-50 cursor-not-allowed": disabled },
        className
      )}
    >
      <input
        type="radio"
        className="hidden"
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <div
        className={classNames(
          "w-5 h-5 border-1 rounded-full flex items-center justify-center",
          {
            "border-6 border-blue-500": checked,
            "border-gray-300": !checked,
          }
        )}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

interface RadioGroupProps {
  options: { value: number; label: ReactNode; disabled?: boolean }[];
  value: number;
  onChange: (value: number) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

export { Radio, RadioGroup };
