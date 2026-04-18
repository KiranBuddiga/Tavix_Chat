import { Eye, EyeOff, MessageCircleCode } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    alert("Login Successfull");
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-brown/80 flex justify-center items-center">
        <img
          src="/Work chat-bro.png"
          alt="Work chat illustration"
          className="w-[80%] max-w-xl h-auto"
        />
      </div>
      <div className="flex flex-col justify-center items-center p-6">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircleCode className="size-9 text-red" />
          <p className="text-3xl font-Pacifico tracking-wide">Travix</p>
        </div>
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <div className="mb-6 text-center">
            <p className="text-xl font-libre font-semibold">
              {isSignUp ? "Create Account" : "Let's - Start Conversation"}
            </p>
            <p className="text-sm text-gray-500 font-Quicksand mt-1">
              {isSignUp
                ? "Sign up to get started"
                : "Please login or sign up to continue"}
            </p>
          </div>
          <div className="space-y-5">
            {isSignUp && (
              <div>
                <label className="text-sm font-medium font-Quicksand block mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your User Name"
                  maxLength={50}
                  className="w-full p-3 border border-gray rounded-lg focus:border-red focus:ring-2 focus:ring-red transition duration-200 outline-none font-Quicksand"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium font-Quicksand block mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                maxLength={50}
                className="w-full p-3 border border-gray rounded-lg focus:border-red focus:ring-2 focus:ring-red transition duration-200 outline-none font-Quicksand"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium font-Quicksand block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showpassword ? "text" : "password"}
                  placeholder="Your Password"
                  maxLength={20}
                  className="w-full p-3 pr-10 border border-gray rounded-lg focus:border-red focus:ring-2 focus:ring-red transition duration-200 outline-none font-Quicksand"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showpassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute top-4.5 right-3 size-4 text-gray-600"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="absolute top-4.5 right-3 size-4 text-gray-600"
                  />
                )}
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-red py-2 font-semibold font-libre text-white text-base rounded-lg hover:bg-orange hover:scale-105 transition duration-200 shadow-md"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
          <p className="text-sm text-center mt-6 font-Quicksand text-gray-500">
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setSignUp(!isSignUp)}
              className="text-red font-semibold cursor-pointer hover:underline"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
