import { type ButtonHTMLAttributes } from "react";
import { cx } from "@/utils/cx";

type ButtonVariant = "primary" | "secondary";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-accent-600 text-white hover:bg-accent-400 disabled:border-border-button-default disabled:bg-background-primary-default disabled:text-text-secondary",
  secondary:
    "border border-border-button-default bg-background-primary-default text-text-primary hover:bg-background-primary-hover disabled:text-text-secondary",
};

export function buttonClassName(variant: ButtonVariant, className?: string) {
  return cx(
    "inline-flex h-11 min-h-11 items-center justify-center rounded-lg px-4 text-base font-medium",
    "disabled:cursor-not-allowed",
    variantClass[variant],
    className,
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />;
}
