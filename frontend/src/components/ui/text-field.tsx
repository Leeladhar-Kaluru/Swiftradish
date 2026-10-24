import { type InputHTMLAttributes, type ReactNode } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
};

export function TextField({ id, label, hint, className, ...props }: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hintId}
        className={[
          "h-11 rounded-lg border border-border-button-default bg-background-primary-default px-3",
          "text-base text-text-primary",
          className ?? "",
        ].join(" ")}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-base text-text-secondary">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
