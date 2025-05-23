import React from "react";
import UserForm from "../components/UserForm";
import { useAuthStore } from "../store/userAuthStore";
import { Link } from "react-router-dom";

const Form = () => {
    const user = useAuthStore((state) => state.user);
  return (
    <>
      {!user ? (
        <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-extrabold text-gray-800">Welcome</h1>
          <p className="text-xl mt-4 text-gray-600">
            To access and complete your form, please{" "}
            <span className="text-primary font-semibold underline cursor-pointer">
              <Link to="/login">log in</Link>
            </span>{" "}
            to your account.
          </p>
        </div>
      ) : (
        <UserForm />
      )}
    </>
  );
};

export default Form;
