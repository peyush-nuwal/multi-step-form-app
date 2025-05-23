import { useEffect, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";
import Profile from "./profile";
const navOptions = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/demo" },
  { name: "About-us", path: "/demo" },
  { name: "Contact", path: "/demo" },
  { name: "Fill Form", path: "/Form" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Home");
  const NavRef = useRef();
  const user = useAuthStore((state) => state.user);
 

  const handleNavbar = () => {
    setOpen((open) => !open);
  };

  const handleClickOutside = (e) => {
    if (NavRef.current && !NavRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-16 w-full bg-white flex justify-between items-center px-5 lg:px-8">
      <h1 className="text-2xl font-extrabold">Garp</h1>

      <div className="hidden  lg:flex items-center gap-8">
        <div className=" flex  items-start  justify-between gap-3 text-lg font-medium">
          {navOptions.map((opt, idx) => (
            <Link
              to={opt.path}
              key={idx}
              onClick={() => handleSelect(opt.name)}
              className={` ${selectedOption == opt.name && "selected-option"} ${
                selectedOption == opt.name ? "text-black" : "text-gray-700"
              }  hover-effect`}
            >
              {opt.name}
            </Link>
          ))}
        </div>
        <div className=" h-full flex items-center   gap-2 ">
          {user ? (
            <Profile user={user} />
          ) : (
            <>
              <Link to="/signup" onClick={() => setOpen(false)}>
                {" "}
                <button className="btn secondary">Sign up</button>
              </Link>
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className=" btn primary !px-5">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* slider for small screeen */}
      <span
        onClick={handleNavbar}
        className="block lg:hidden relative z-[1000] text-4xl  cursor-pointer"
      >
        {" "}
        {open ? <RxCross2 /> : <HiMenuAlt3 />}
      </span>

      <div
        ref={NavRef}
        className={`bg-white fixed top-0  ${
          open ? "right-0" : "-right-100"
        } z-[999] h-screen w-2/4 flex lg:hidden flex-col items-start  justify-between gap-2   px-4 pt-[10%] border-l border-gray-300 shadow-lg  transition-all ease-in-out duration-500`}
      >
        <div className=" flex flex-col items-start  justify-between gap-2 text-3xl font-semibold">
          {navOptions.map((opt, idx) => (
            <Link
              to={opt.path}
              key={idx}
              onClick={() => handleSelect(opt.name)}
              className={` ${selectedOption == opt.name && "selected-option"} ${
                selectedOption == opt.name ? "text-black" : "text-gray-700"
              }  hover-effect`}
            >
              {opt.name}
            </Link>
          ))}
        </div>

        <div className="w-full flex flex-col gap-2 mb-4">
          {user ? (
            <Profile user={user} />
          ) : (
            <>
              <Link to="/signup" onClick={() => setOpen(false)}>
                {" "}
                <button className="w-full btn secondary">Sign up</button>
              </Link>
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full btn primary ">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
