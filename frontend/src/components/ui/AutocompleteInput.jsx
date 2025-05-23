import { useState, useEffect, useRef } from "react";
import Input from "./input";

const   AutocompleteInput = ({
  label,
  options = [],
  placeholder,
  important,
  className = "",
  onChange,
  name,
  value,
  errorMessage = "This field is required",
  customError,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [showOptions, setShowOptions] = useState(false);
  const [touched, setTouched] = useState(false);

  const wrapperRef = useRef();

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setTouched(true);
    setShowOptions(true);
    onChange && onChange({ target: { name, value } });
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setTouched(true);
    setShowOptions(false);
    onChange && onChange({ target: { name, value: String(option) } });
  };

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const isError = touched && inputValue.trim() === "";

  return (
    <div className="relative w-full max-w-xl h-fit " ref={wrapperRef}>
      <Input
        label={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        important={important}
        className={className}
        onBlur={() => setTouched(true)}
      />

      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 z-10 w-full bg-white border border-gray-300 rounded-sm shadow-sm max-h-48 overflow-y-auto">
          {filteredOptions.map((option, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {isError && (
        <p className="absolute top-full text-red-500 text-sm mt-1 ml-1">
          {errorMessage}
        </p>
      )}
      {customError && <p className="text-red-500 text-sm">{customError} </p>}
    </div>
  );
};

export default AutocompleteInput;
