import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  type ForwardRefRenderFunction,
} from "react";
import { Loader2 } from "lucide-react";

export type Variant = "primary" | "default" | "text";

export const commonStyles =
  "group inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold";

export const variantStyles = {
  primary: "bg-blue-600 text-white hocus:bg-blue-700 dark:hocus:bg-blue-500",
  default:
    "bg-neutral-50 text-neutral-900 ring-1 ring-inset ring-neutral-300 hocus:bg-neutral-200 dark:bg-neutral-700 dark:text-white dark:ring-0 dark:hocus:bg-neutral-600",
  text: "text-neutral-900 hocus:bg-neutral-200 dark:text-white dark:hocus:bg-neutral-700",
} satisfies Record<Variant, string>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (props, ref) => {
  const { className, variant = "default", isLoading = false, ...rest } = props;
  const finalClassName = clsx(commonStyles, variantStyles[variant], className);
  if (isLoading)
    return (
      <button className={finalClassName} ref={ref} {...rest} disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {props.children}
      </button>
    );
  return <button className={finalClassName} ref={ref} {...rest} />;
};

export const Button = forwardRef(ButtonComponent);
