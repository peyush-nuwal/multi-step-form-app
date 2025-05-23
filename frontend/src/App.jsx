
import Home from "./pages/Home";
import Login from "./pages/Login";
import {  Route,Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Demopage from "./pages/Demopage";
import Signup from "./pages/Signup";
import Form from "./pages/Form";
import { useEffect } from "react";
import { useAuthStore } from "./store/userAuthStore";
function App() {
  const restore = useAuthStore((state) => state.restore);

  useEffect(() => {
    restore(); // restore user from localStorage on page load
  }, []);
  return (
    <main className="bg-gray-200 min-h-screen w-full h-full  pb-10">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/demo" element={<Demopage />} />
      </Routes>
    </main>
  );
}

export default App
