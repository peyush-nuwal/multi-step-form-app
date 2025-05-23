import React, { useEffect, useState } from "react";

const Input = React.forwardRef(
  (
    {
      placeholder,
      label,
      className,
      important,
      type = "text",
      onChange,
      value,
      validationType = "text",
      customErrors,
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    // Check if the type is textarea to render accordingly
    const isTextarea = type === "textarea";
    
    const regexMap = {
      text: /^[a-zA-Z0-9\s,.'-]{2,}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      zip: /^\d{5}(-\d{4})?$/,
    };

    const errorMessages = {
      text: `${value} should be at least 2 characters and contain only letters`,
      email: `"${value}" isn't   a valid email address`,
      zip: `${value} isn't a valid ZIP code (e.g., 12345 or 12345-6789)`,
    };

    const showError =
      important &&
      touched &&
      (!value?.trim() || !regexMap[validationType]?.test(value.trim()));

    const getErrorMessage = () => {
      if (!value?.trim()) return `${label} can't be empty`;
      return errorMessages[validationType] || `${label} is invalid`;
    };

    useEffect(() => {
      if (!touched) return;
      const timeout = setTimeout(() => {
         getErrorMessage();
        
      }, 500); // 500ms debounce

      return () => clearTimeout(timeout);
    }, [value, touched]);

    // Shared className for both input and textarea
    const sharedClasses = `w-full bg-transparent border ${
      value === ""
        ? " border-gray-300"
        : showError && showError
        ? "border-red-500"
        : "border-green-500"
    }   rounded-sm pl-2 placeholder-gray-500 placeholder:font-medium transition-colors duration-300 outline-0 ${className} input-ui focus:border-gray-400`;

    return (
      <div
        onClick={() => setTouched(!touched)}
        className="max-w-xl w-full flex flex-col my-2"
      >
        <label
          htmlFor={label}
          className="text-lg font-medium text-gray-800 pl-1 mb-1"
        >
          {label}{" "}
          {important && <span className="text-red-400 ml-1 text-xl">*</span>}
        </label>

        {isTextarea ? (
          <textarea
            ref={ref}
            id={label}
            placeholder={placeholder || "enter here .."}
            value={value}
            onChange={onChange}
            name={label}
            rows={3} // You can adjust rows as you want
            className={`${sharedClasses} min-h-[50px] h-auto resize-y py-2`}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            id={label}
            placeholder={placeholder || "enter here .."}
            value={value}
            onChange={onChange}
            name={label}
            className={`h-12 ${sharedClasses}`}
          />
        )}

        {showError && (
          <p className="text-red-500 text-sm mt-1">{getErrorMessage()}</p>
        )}
        {customErrors && (
          <p className="text-red-500 text-sm">{customErrors} </p>
        )}
      </div>
    );
  }
);

export default Input;
