import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Input from "./ui/input"; // assumes this supports ref forwarding

const ProjectCard = ({ index, data, onEdit, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isEditing) {
      reset({
        title: data.title,
        description: data.description,
      });
    }
  }, [isEditing, data, reset]);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (formData) => {
    onEdit({ ...formData, id: data.id });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMenuVisible(false);
  };

  return (
    <div className="max-w-xl w-full  p-2 rounded-md border border-gray-300 space-y-2">
      <div className="w-full flex justify-between items-center">
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <h1 className="text-xl lg:text-2xl font-semibold  flex items-center gap-2">
              <MdEdit /> Editing
            </h1>
            <Input
              placeholder="Enter title"
              {...register("title", { required: true })}
            />
            <Input
              placeholder="Enter description"
              type="textarea"
              {...register("description", { required: true })}
            />
            <div className="flex gap-2 mt-1 ml-auto">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn text-gray-500 hover:text-red-500"
              >
                Cancel
              </button>
              <button type="submit" className="btn primary">
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-xl font-medium">
              <span className="mr-2">{index + 1}.</span>
              {data.title}
            </h1>
            <div
              ref={menuRef}
              onClick={() => setMenuVisible(!menuVisible)}
              className="relative text-xl text-gray-700 hover:text-gray-800 cursor-pointer"
            >
              <PiDotsThreeOutlineVerticalFill />
              {menuVisible && (
                <ul className="absolute top-full right-full max-w-[150px] w-[120px] bg-white rounded-sm border border-gray-300 shadow-lg text-lg font-medium z-50">
                  <li
                    onClick={handleEdit}
                    className="py-1 px-2 hover:bg-gray-200 flex items-center gap-2 hover:scale-105 hover:text-gray-800 transition-all"
                  >
                    <MdEdit />
                    Edit
                  </li>
                  <li
                    onClick={() => onDelete(data.id)}
                    className="py-1 px-2 text-red-400 hover:text-red-500 hover:bg-gray-200 hover:scale-105 flex items-center gap-2 transition-all"
                  >
                    <FaTrashCan />
                    Delete
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
      {!isEditing && (
        <p className="w-5/6 mt-2 text-sm lg:text-base text-gray-700">
          {data.description}
        </p>
      )}
    </div>
  );
};

export default ProjectCard;
