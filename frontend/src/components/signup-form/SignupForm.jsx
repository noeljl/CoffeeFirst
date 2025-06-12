import React from "react";
import "./SignupForm.css";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const navigate = useNavigate();
  return (
    <div>
      <form>
        <input type="email" placeholder="Email" className="inputField" required/>
        <input type="password" placeholder="Add a password" className="inputField" required />

        <label className="checkbox-container">
          <input type="checkbox" />
          Yes, please email me CoffeeFirst special offers.
        </label>
        <Button type="submit" fs="medium" padding="medium" bg="red" radius="small" width="full" onClick={()=>{navigate("/signup")}}>NEXT</Button>
      </form>
    </div>
  );
}

export default SignupForm;