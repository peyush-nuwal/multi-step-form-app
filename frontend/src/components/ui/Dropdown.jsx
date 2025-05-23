import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ label, className, important,onChange, options = [], customErrors}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
const [touched, setTouched] = useState(false);
  const dropdownRef = useRef();

  

  // Toggle dropdown visibility
  const handleClick = () => {
    setOpen((prev) => !prev);
    
  };

  // Handle selecting an option
  const handleOptionClick = (option) => {
   
    setSelected(option);
    if (onChange) {
      onChange({
        target: {
          value: option, 
        },
      });
    }
    setOpen(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

 

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isError = touched && !selected;


  return (
    <div
      className="relative z-10 max-w-xl w-full cursor-pointer mb-10"
      ref={dropdownRef}
    >
      <div onClick={() => setTouched(true)}>
        <label className="text-lg font-medium text-gray-800 pl-1 mb-1">
          {label}
          {important && <span className="text-red-400 ml-1 text-xl">*</span>}
        </label>

        <div
          onClick={handleClick}
          className={`relative border  ${
            isError
              ? "border-red-500"
              : selected
              ? "border-green-500"
              : "border-gray-300"
          }  rounded-sm pl-2 ${className} input-ui transition-colors duration-300 outline-0 bg-transparent w-full h-12 flex items-center justify-between pr-3`}
        >
          <span
            className={`${
              selected ? "text-gray-700" : "text-gray-500"
            } font-medium`}
          >
            {selected || "Select an option"}
          </span>
          <FiChevronDown
            className={`w-5 h-5 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {open && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-sm z-[9999] max-h-[150px] overflow-y-auto shadow-md">
          {options.map((opt, i) => (
            <li
              key={i}
              className="py-2 px-3 hover:bg-gray-100 text-gray-800"
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
      {touched && selected == "" && (
        <p className="absolute top-full text-red-500 text-sm mt-1">
          Select a option
        </p>
      )}
      {customErrors && <p className="text-red-500 text-sm">{customErrors} </p>}
    </div>
  );
};

export default Dropdown;
