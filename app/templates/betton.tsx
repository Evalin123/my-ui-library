import React from "react";
import { cn } from "../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Spin } from "./Icons";

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

type ButtonProps =
  | (ButtonBaseProps & {
      href?: never;
      target?: never;
    })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> &
      ButtonBaseProps & {
        type?: never;
      });

const buttonVariants = cva(
  "ring-offset-background inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-none bg-black text-white hover:bg-black/50",
        outlined:
          "bg-color-midnight text-black border-black border hover:bg-black/30",
        dashed: "bg-inherit text-black border border-dashed hover:bg-black/30",
        filled: "border-none bg-black/25 text-black hover:bg-black/50",
        text: "bg-inherit text-black border-none hover:bg-black/30",
        link: "bg-inherit border-none text-black hover:text-black/50",
      },
      size: {
        small: "h-9 px-3 py-1 text-sm",
        medium: "h-10 px-4 py-2 text-base",
        large: "h-11 px-5 py-3 text-lg",
        icon: "h-10 w-10",
      },
      shape: {
        square: "rounded-md",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "medium",
      shape: "square",
    },
  }
);

const Button = ({
  href,
  target,
  onClick,
  disabled = false,
  loading = false,
  children,
  variant,
  size,
  shape,
  className,
  ...props
}: ButtonProps) => {
  if (loading) {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape }), className)}
        disabled
        type="button"
        {...props}
      >
        <Spin />
        {size !== "icon" && children}
      </button>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, shape }), className)}
      disabled={disabled}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
