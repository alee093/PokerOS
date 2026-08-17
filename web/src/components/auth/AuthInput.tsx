import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

import "./AuthInput.css";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error?: boolean;
}

export default function AuthInput({
  icon: Icon,
  error,
  className,
  ...rest
}: AuthInputProps) {
  return (
    <div
      className={`auth-input${error ? " auth-input--error" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <Icon size={18} className="auth-input__icon" />
      <input className="auth-input__field" {...rest} />
    </div>
  );
}