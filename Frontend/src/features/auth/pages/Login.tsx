import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleLogin(email, password);

    navigate("/feed");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="text-white flex items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center flex-col gap-2 w-120 p-20">
          <h1 className="text-2xl font-bold">Log In</h1>
          <h3 className="text-sm text-gray-500">Log In with your Email</h3>
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
            <p className="text-gray-400 text-sm">
              Doesn't have an Account?{" "}
              <span className="underline">
                <Link to={"/register"}>Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
