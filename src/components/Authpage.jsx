import React, { useState } from "react";
import { supabase } from "../supabase";

const Authpage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error("Error in signingUp: ", signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        console.error("error in signingIn: ", signInError.message);
        return;
      }
    }
  };

  return (
    <div className="flex flex-col   justify-center items-center text-xl bg-black text-white gap-1.5">
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border  border-white w-70 "
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border  border-white w-70 "
        />
        <div className="flex flex-col items-center ">
          <button
            className="border border-white w-20  cursor-pointer hover:bg-gray-600"
            type="submit"
          >
            {isSignUp ? "SignUp" : "SignIn"}
          </button>
        </div>
      </form>
      <div>
        <button
          className="border border-white w-40  cursor-pointer hover:bg-gray-600"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Go to SignIn" : "Go to SignUp"}
        </button>
      </div>
    </div>
  );
};

export default Authpage;
