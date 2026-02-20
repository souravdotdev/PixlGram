import axios from "axios";
import type { AxiosResponse } from "axios";
import { useState } from "react";

const Login = () => {
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [authResponse, setAuthResponse] = useState<AxiosResponse | null>(null);
      const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      },{withCredentials: true});

      setAuthResponse(response);
      console.log(response);
      setEmail("");
      setPassword("");

    } catch {
      setAuthResponse(null);
    }
  };

  return (
    <div>
        <div className="text-white flex items-center justify-center h-screen w-full">
      <div className="flex items-center justify-center flex-col gap-2 w-120 p-20">
        <h1 className="text-2xl font-bold">Log In</h1>
        <h3 className="text-sm text-gray-500">
          Log In with your Email
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 w-full gap-3 "
        >
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
            LogIn
          </button>
          {hasSubmitted && (
            authResponse?.status === 200 ? 
              <p className="text-green-600 text-sm">Logged In Successfully</p> : 
              <p className="text-red-500 text-sm">Sorry, Error in Logging In your account</p>
          )}
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login