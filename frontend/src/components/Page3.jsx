import React from 'react'
import Input from './ui/input';
import ProjectCard from './ProjectCard';
import { useForm } from 'react-hook-form';

const Page3 = ({ projects, setProjects, handleProjectChange }) => {
    const { register, handleSubmit, reset } = useForm();
  const addProject = (data) => {
    const newProject = {
      id: Date.now(),
      title: data.Title,
      description: data.Description,
    };
    setProjects((prev) => [...prev, newProject]);
    reset();
  };


  const handleEdit = (index, updatedData) => {
    setProjects((prev) =>
      prev.map((project, i) =>
        i === index ? { ...project, ...updatedData } : project
      )
    );
  };

  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div className="min-w-full w-full p-4 lg:p-6 flex flex-col lg:flex-row  justify-between ">
      <div>
        <form onSubmit={handleSubmit(addProject)} className="space-y-3">
          <h1 className="text-xl lg:text-2xl font-semibold  mb-10 ">
            3. Projects
          </h1>
          <Input
            label={"Title"}
            placeholder={"Enter project title"}
            {...register("Title", { required: true })}
          />
          <Input
            label={"Description"}
            placeholder={"Enter description (optional)"}
            type="textarea"
            {...register("Description")}
          />
          <div className="text-lg w-full lg:w-xl flex justify-end mt-5">
            <button type="submit" className="btn primary !px-6">
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="mt-20  w-full ml-full  flex flex-col justify-start items-start lg:items-center space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            data={project}
            onEdit={(formData) => handleEdit(index, formData)}
            onDelete={() => handleDelete(project.id)}
            
          />
        ))}
      </div>
    </div>
  );
};

export default Page3