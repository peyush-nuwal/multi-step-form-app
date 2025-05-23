import React ,{useRef, useState} from 'react'
import { CiUser } from "react-icons/ci";
import {PiDotsThreeOutlineVerticalFill} from 'react-icons/pi'
import { IoExitOutline } from "react-icons/io5";
import { useAuthStore } from '../store/userAuthStore';


const Profile = ({user}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef= useRef()
    const logout = useAuthStore((user)=>user.logout)
  return (
    <div className="flex border-t lg:border-none border-gray-300 pt-4 lg:pt-0">
      <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center  justify-center ">
        <CiUser className="text-2xl" />
      </div>
      <span className="ml-2">
        <h1 className="text-sm text-gray-800">{user.name}</h1>
        <h1 className="text-xs text-gray-500">View profile</h1>
      </span>
      <div
        ref={menuRef}
        onClick={() => setMenuVisible(!menuVisible)}
        className="relative ml-auto lg:ml-3 text-xl lg:text-base text-gray-700 hover:text-gray-800 cursor-pointer"
      >
        <PiDotsThreeOutlineVerticalFill />
        {menuVisible && (
          <ul className="absolute bottom-full lg:top-full right-full max-w-[150px] w-[120px] h-full bg-white rounded-sm border border-gray-200 shadow-lg text-lg font-medium z-50">
            <li
              onClick={logout}
              className="py-1 px-2 text-red-400 hover:text-red-500 hover:bg-gray-200 hover:scale-105 flex items-center gap-2 transition-all"
            >
              Log out <IoExitOutline className="text-xl" />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile