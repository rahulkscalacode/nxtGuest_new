export const validateName = (name) => {
  console.log("validateName==>", name); 

  if (!name || name.trim() === "") {
    return "First name is required!";
  }
};

//validateEmail.js
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return "Email is required.";
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return "";
};
