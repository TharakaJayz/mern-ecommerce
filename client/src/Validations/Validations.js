export const checkEmpty = (value) => {
    // console.log('value form validation function',value)
    if (value.trim() === "" || value.trim() === null) {
      return true;
    } else {
      return false;
    }
  };
  
  export const emailValidation = (value) => {
    if (checkEmpty(value)) {
      // return {state: false,message:"email could not be empty !"}
      return [false, "E-mail could not be empty !"];
    }
    const emailPattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  
    if (!emailPattern.test(value)) {
      return [false, "This is not a valid email !"];
    }
  
    return [true, "this is a correct email"];
  };
  export const PasswordValidation = (value) => {
    if (checkEmpty(value)) {
      // return {state: false,message:"email could not be empty !"}
      return [false, "Password could not be empty !"];
    }
  
    return [true, "this is a correct Password"];
  };
  
  export const passwordConfirmation = (value1,value2)  =>{
    if(checkEmpty(value1) || checkEmpty(value2)){
        return [false, "passowrd or confirm password could not be empty !"];
    }

    if(value1 !== value2){
        return [false, "passowrd or confirm password should be same !"];
    }
    return [true,"correct combination"]
  }