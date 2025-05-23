import React, { useEffect, useState } from "react";
import Input from "./ui/input";
import banner from "/banner.png";
import { handlelogin, handleSignup } from "../api/auth/auth";
import { useAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handelChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleClick = () => {
    setIsLogin(!isLogin);
  };

  const handleSignUp = async () => {
    try {
      const res = await handleSignup(user);
      const { user: loggedInUser, token } = res.data;

      if (loggedInUser && token) {
        login(loggedInUser, token);
        navigate("/");
        console.log("signed up successfully", loggedInUser);
      } else {
        console.error("sign up failed, no token/user", res);
      }
    } catch (error) {
      console.error("error while signing up", error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await handlelogin(user);
      const { user: loggedInUser, token } = res.data;

      if (loggedInUser && token) {
        login(loggedInUser, token);
        navigate("/");
        console.log("Logged in successfully", loggedInUser);
      } else {
        console.error("Login failed, no token/user", res);
      }
    } catch (error) {
      console.error("error while loging in", error);
    }
  };

  useEffect(() => {
    if (mode == "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [mode]);

  return (
    <div className="h-[80vh]  pt-5 flex items-center justify-center">
      <div className=" h-fit   w-[85%]  lg:w-[60%] flex bg-white mt-0 lg:mt-10  ">
        <div className="w-16 lg:w-auto max-h-[80vh] overflow-hidden">
          <img
            src={banner}
            alt=""
            className="h-full w-full object-cover lg:object-cover"
          />
        </div>
        <div className="w-full h-full lg:w-3/5 p-5  ">
          {/* ----heading ----  */}
          <div>
            <h1 className="text-gray-800 font-bold text-3xl lg:text-4xl">
              {isLogin ? "Welcome back!" : "Create Account"}
            </h1>
            <h4 className="mt-1 text-sm  text-gray-500">
              {isLogin
                ? "Sign in to continue where you left off."
                : "Let’s get you started — just a name, email, and password away."}
            </h4>
          </div>
          {/* ----- inputs ----  */}
          <div className="mt-5 flex flex-col ">
            {!isLogin && (
              <Input
                label={"Name"}
                placeholder={"e.g. Bruce wayne"}
                important={true}
                onChange={(e) => handelChange("name", e.target.value)}
              />
            )}
            <Input
              label={"Email"}
              placeholder={"e.g. iamBatman@gmail.com "}
              important={true}
              type="email"
              onChange={(e) => handelChange("email", e.target.value)}
            />
            <Input
              label={"Password"}
              type="password"
              placeholder={"e.g. joker432"}
              important={true}
              onChange={(e) => handelChange("password", e.target.value)}
            />
          </div>
          {/* ---login button---- */}
          <div>
            <button
              onClick={isLogin ? handleLogin : handleSignUp}
              className="btn primary text-xl !py-4 w-full mt-4"
            >
              {isLogin ? "Login" : " Sign up"}
            </button>
            <h6 className="text-gray-500 font-medium  mt-2">
              {isLogin ? "Don't have an account," : "Already have an account,"}{" "}
              <span
                onClick={handleClick}
                className=" hover:text-primary cursor-pointer"
              >
                Click here.
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
