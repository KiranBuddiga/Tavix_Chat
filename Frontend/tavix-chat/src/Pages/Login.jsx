import { Eye, EyeOff, Loader2, MessageCircleCode } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLoginStore } from "../Store/useLoginStore";
import { useNavigate } from "react-router-dom";
import { emailRegex, nameRegex, passwordRegex } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading, error, login, registerUser } = useLoginStore();
  const [showpassword, setShowPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  const validate = () => {
    let newErrors = {};
    if (isSignUp) {
      if (!firstName.trim()) {
        newErrors.firstName = "First Name is Required";
      } else if (!nameRegex.test(firstName.trim())) {
        newErrors.firstName = "Please enter a valid first name";
      }

      if (!lastName.trim()) {
        newErrors.lastName = "Last Name is Required";
      } else if (!nameRegex.test(lastName.trim())) {
        newErrors.lastName = "Please enter a valid last name";
      }
    }

    if (!emailAddress?.trim()) {
      newErrors.emailAddress = "Email Address is Required";
    } else if (!emailRegex.test(emailAddress)) {
      newErrors.emailAddress = "Please enter a valid Email address";
    }

    if (!password?.trim()) {
      newErrors.password = "Password is Required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      const credentials = {
        EMAIL: emailAddress,
        PASSWORD: password,
      };
      const res = await login(credentials);
      if (res?.status === 200) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      const payload = {
        FIRST_NAME: firstName,
        LAST_NAME: lastName,
        EMAIL: emailAddress,
        PASSWORD: password,
      };
      const res = await registerUser(payload);
      if (res.status === 201) {
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmailAddress("");
        setErrors({});
        setSignUp(false);
      }
    } catch (error) {
      console.error("Register Error", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:bg-brown/80 md:flex md:justify-center md:items-center">
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
              <>
                <div>
                  <label className="text-sm font-medium font-Quicksand block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    maxLength={50}
                    className={`w-full p-3 border rounded-lg outline-none font-Quicksand transition duration-200 ${errors.userName ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray focus:border-red focus:ring-2 focus:ring-red"}`}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    required
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors?.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium font-Quicksand block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    maxLength={50}
                    className={`w-full p-3 border rounded-lg outline-none font-Quicksand transition duration-200 ${errors.userName ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray focus:border-red focus:ring-2 focus:ring-red"}`}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    required
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors?.lastName}
                    </p>
                  )}
                </div>
              </>
            )}
            <div>
              <label className="text-sm font-medium font-Quicksand block mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                maxLength={50}
                className={`w-full p-3 border rounded-lg outline-none font-Quicksand transition duration-200 ${errors.emailAddress ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray focus:border-red focus:ring-2 focus:ring-red"}`}
                value={emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                  setErrors((prev) => ({ ...prev, emailAddress: "" }));
                }}
                required
              />
              {errors?.emailAddress && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.emailAddress}
                </p>
              )}
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
                  className={`w-full p-3 border rounded-lg outline-none font-Quicksand transition duration-200 ${errors.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray focus:border-red focus:ring-2 focus:ring-red"}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
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
              {errors?.password && (
                <p className="text-sm text-red-500 mt-1">{errors?.password}</p>
              )}
            </div>
            <button
              onClick={isSignUp ? handleRegister : handleLogin}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-red py-2 font-semibold font-libre text-white text-base rounded-lg hover:bg-orange hover:scale-105 transition duration-200 shadow-md disabled:bg-red/50 disabled:cursor-not-allowed"
            >
              <span>
                {loading && <Loader2 className="size-5 animate-spin" />}
              </span>
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
