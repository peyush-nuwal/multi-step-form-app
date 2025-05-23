import { apiPost } from "../api";







export const submitPage1 = async (id,user)=>{
 try {
     const res = await apiPost('/form/page1', {id,
         ...user 
     } )
      console.log("personal data saved",res);
      return res
 } catch (error) {
     console.error("Error while subbmiting personal data",error)   
     return null; 
 }
}


export const submitPage2 = async (formId, studying, school) => {
    try {
        console.log("form api ", formId, studying, school )
        const res = await apiPost('/form/page2', {
            formId, studying, school
        })
        console.log("educational data saved", res);
        return res
    }
    catch (error) {
        console.error("Error while submitting educational data", error);
        return null;
    }
   }



export const submitPage3 = async(formId, projects) => {
    try {
        const formattedProjects = projects.map(project => ({
            name: project.title,
            description: project.description,
          }));

        const res = await apiPost('/form/page3', {
            formId,
            projects: formattedProjects,
        }); console.log("projects saved", res);
        return res
    } catch (error) {
        console.error("Error while subbmiting projects",error)
        return null;
    }
   }