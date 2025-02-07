import { cn } from "../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const buttonVariants = cva(
  "ring-offset-background inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-none bg-black text-white hover:bg-black/50",
        outlined: "bg-inherit text-black border-black border hover:bg-black/30",
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
  disabled = false,
  loading = false,
  children,
  variant,
  size,
  shape,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(buttonVariants({ variant, size, shape }), className)}
    disabled={disabled || loading}
    type="button"
    {...props}
  >
    {loading ? (
      <svg
        className="mr-1 -ml-1 size-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="black"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="black"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ) : null}
    {children}
  </button>
);

export default Button;
