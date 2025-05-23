export const validatePage1 = (userData = {}) => {
    const errors = {};

    if (!userData.name?.trim()) errors.name = "Name is required";
    if (!userData.email?.trim()) errors.email = "Email is required";
    if (!userData.address1?.trim()) errors.address1 = "Address Line 1 is required";
    if (!userData.city?.trim()) errors.city = "City is required";
    if (!userData.zipcode?.trim()) errors.zipcode = "Zip Code is required";
    if (!userData.state?.trim()) errors.state = "State is required";

    return errors;
};

export const validatePage2 = (educationData) => {
    const errors = {};

    if (!educationData.studying?.trim()) {
        errors.studying = "Please specify if you are currently studying";
    }

    if (educationData.studying === "Yes" && !(String(educationData.college ?? "").trim())) {
        errors.college = "College name is required";
    }
    

    return errors;
};
  



