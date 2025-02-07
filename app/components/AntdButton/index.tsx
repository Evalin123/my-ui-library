import React, { useRef } from "react";
import classNames from "classnames";

interface AntdButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AntdButton: React.FC<AntdButtonProps> = ({
  type = "default",
  className,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const ripple = document.createElement("span");

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    ripple.classList.add("ripple-border");
    buttonRef.current.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 500);
  };

  return (
    <button
      ref={buttonRef}
      className={classNames(
        "relative overflow-hidden px-4 py-2 rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none border",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-white text-gray-800 border-gray-300 hover:bg-gray-100",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default AntdButton;
