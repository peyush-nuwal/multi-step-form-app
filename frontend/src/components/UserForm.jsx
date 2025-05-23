import  { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import indianStates from '../assets/states'
import colleges from "../assets/Colleges";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import { validatePage1, validatePage2 } from "../utils/validationSchema";
import { submitPage1, submitPage2, submitPage3 } from "../api/form/form";
import {useNavigate} from 'react-router-dom'
import { useAuthStore } from "../store/userAuthStore";


const UserForm = () => {
  const totalPages = 3;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zipcode: "",
    state: "",
  });
  const [educationData, setEducationData] = useState({
    studying: "No",
    school: "",
  });
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [errors, setErrors] = useState({});
  const [formId,setFormId]=useState("")
  
  const user = useAuthStore((state) => state.user);
  const navigate=useNavigate()


  const handleNextPage = async() => {
    //page1 validation
    if (currentPage === 1) {
      const validationErrors = validatePage1(userData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      await handleSubmitPage1();
    }

    //page 2 validation
    if (currentPage === 2) {
      const validationErrors = validatePage2(educationData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      await handleSubmitPage2();
    }

    setCurrentPage((curr) => (curr < totalPages ? curr + 1 : curr));
  };

  const handlePrevPage = async() => {
    if (currentPage === 3) {
      await handleSubmitPage3();
    } else if (currentPage === 2) {
      await handleSubmitPage2();
    }
    setCurrentPage((curr) => (curr > 1 ? curr - 1 : curr));
  };

  // Handler for input changes
  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Handler education for input changes
  const handleEducationChange = (field, value) => {
    setEducationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle project for input changes
  const handleProjectChange = (index, field, value) => {
    setProjects((prev) =>
      prev.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    );
  };

  const handleSubmit = async () => {
    //just making sure the latest data is pushed  
    try {
      await handleSubmitPage1(); 
      await handleSubmitPage2();
      await handleSubmitPage3();
  
      const allData = {
        userData,
        educationData,
        projects,
      };
  
      console.log("🔥 Final Combined Submission:", allData);
      navigate('/')
  
    } catch (err) {
      console.error("Error in final submission", err);
    }
  };

  const handleSubmitPage1=async()=>{
    try {
      const res = await submitPage1(user.id, userData);
     setFormId(res.data.form.id);
   

    } catch (error) {
       console.error("Error while submiting userData ", error);
       return 1
    }
  }

  const handleSubmitPage2 = async () => {
    try {
      const studyingBoolean = educationData.studying === "Yes";
      const res = await submitPage2(
        formId,
        studyingBoolean,
        studyingBoolean ? educationData.school : null
      );
      console.log(res);
    } catch (error) {
      console.error("Error while submiting educational data ", error);
    }
  };
  const handleSubmitPage3 = async () => {
    try {
      console.log(projects)
      const res = await submitPage3(formId,projects);
      console.log(res);
    } catch (error) {
      console.error("Error while submiting projects ", error);
    }
  };


  useEffect(() => {

    const timer = setTimeout(() => {
      if (currentPage === 1) {
        const validationErrors = validatePage1(user.id,userData);
        if (Object.keys(validationErrors).length === 0) {
           handleSubmitPage1();
      
        }


      } else if (currentPage === 2) {
        const validationErrors = validatePage2(educationData);
        if (Object.keys(validationErrors).length === 0) {
          handleSubmitPage2();
        }


      } else if (currentPage === 3) {
        if(projects.length>1){

          handleSubmitPage3();
        }
      }
    }, 5000);

    // Cleanup timeout on every change (debounce logic)
    return () => clearTimeout(timer);
  }, [userData, educationData, projects, currentPage]);


  return (
    <div className="w-[95%]  h-full  mx-auto pb-5  pt-5 mt-5 bg-white rounded-md  ">
      <ProgressBar
        totalStages={totalPages}
        currentStage={currentPage}
        setCurrentStage={setCurrentPage}
      />

      {/* -------form------- */}
      <div className=" overflow-x-clip w-full h-full  ">
        <div
          style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
          className="flex transition-transform duration-500 ease-in-out w-full h-full "
        >
          {/* Page 1 */}
          <Page1
            userData={userData}
            handleChange={handleChange}
            indianStates={indianStates}
            errors={errors}
          />

          {/* Page 2 */}
          <Page2
            educationData={educationData}
            handleEducationChange={handleEducationChange}
            colleges={colleges}
            errors={errors}
          />
          {/* Page 3 */}
          <Page3
            projects={projects}
            setProjects={setProjects}
            handleProjectChange={handleProjectChange}
          />
        </div>
      </div>

      {/* -----Next and prev btn----- */}
      <div className="w-2/6 lg:w-1/5 place-self-end flex justify-end gap-2 pr-5">
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className="btn secondary text-white text-xl"
          >
            Prev
          </button>
        )}

        {currentPage < totalPages ? (
          <button
            onClick={handleNextPage}
            className="btn primary text-white text-xl"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn primary text-white text-xl"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserForm;
