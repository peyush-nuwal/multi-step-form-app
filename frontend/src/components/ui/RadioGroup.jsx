import { useState, useEffect } from "react";

const RadioGroup = ({
  label,
  options = [],
  name,
  className = "",
  onChange,
  important,
  defaultValue = "", // <-- New prop
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (value) => {
    setSelected(value);
    onChange && onChange(value);
  };

  // In case defaultValue changes dynamically
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-lg font-medium text-gray-800 mb-2">
        {label}
        {important && <span className="text-red-400 ml-1 text-xl">*</span>}
      </label>

      <div className="space-x-2 flex items-center">
        {options.map((option, i) => (
          <label key={i} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={selected === option}
              onChange={() => handleChange(option)}
              className="form-radio accent-primary w-4 h-4"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
