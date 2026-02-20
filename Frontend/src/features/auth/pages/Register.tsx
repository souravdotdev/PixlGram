import axios from "axios";
import { useState } from "react";
import type { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authResponse, setAuthResponse] = useState<AxiosResponse | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      },{withCredentials: true});

      setAuthResponse(response);
      setEmail("");
      setPassword("");
      setUsername("");
      navigate(`/verify/${response.data.user.email}`);
    } catch {
      setAuthResponse(null);
    }

    
  };

  return (
    <div className="text-white flex items-center justify-center h-screen w-full">
      <div className="flex items-center justify-center flex-col gap-2 p-10">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <h3 className="text-sm text-gray-500">
          Create your account with Username and Email
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 w-full gap-3 "
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-[#353535] py-2 px-3 rounded-xl focus:outline-none"
            type="text"
            placeholder="username"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#353535] py-2 px-3 rounded-xl focus:outline-none"
            type="email"
            placeholder="name@example.com"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#353535] py-2 px-3 rounded-xl focus:outline-none"
            type="password"
            placeholder="passxxxxx"
          />
          <button className="px-2 py-3 bg-white text-black text-sm rounded-2xl cursor-pointer">
            Register
          </button>
          <p className="text-gray-400 text-sm">Already have an Account? <span className="underline"><Link to={"/login"}>Login</Link></span></p>
          {hasSubmitted && (
            authResponse?.status === 201 ? 
              <p className="text-green-600 text-sm">Registered Successfully. Now please Log In with your Email</p> : 
              <p className="text-red-500 text-sm">Sorry, Error in registering your account</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
