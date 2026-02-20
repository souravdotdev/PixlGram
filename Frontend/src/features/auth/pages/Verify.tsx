import React, { useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState<string>("");
  const [authResponse, setAuthResponse] = useState<AxiosResponse | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const {email} = useParams()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/verify/${email}`,
        {
          otp
        },
        { withCredentials: true }
      );

      setAuthResponse(response);
      setOtp("");
    } catch {
      setAuthResponse(null);
    }
  };

  return (
    <div>
      <div>
        <div className="text-white flex items-center justify-center h-screen w-full">
          <div className="flex items-center justify-center flex-col gap-2 w-120 p-20">
            <h1 className="text-2xl font-bold">Verify</h1>
            <h3 className="text-sm text-gray-500">Verify your account with OTP sent to your Email</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-5 w-full gap-3 "
            >
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-[#353535] py-2 px-3 rounded-xl focus:outline-none"
                type="text"
                placeholder="XXXX"
              />
              <button className="px-2 py-3 bg-white text-black text-sm rounded-2xl cursor-pointer">
                Verify
              </button>
              {hasSubmitted &&
                (authResponse?.status === 200 ? (
                  <p className="text-green-600 text-sm">
                    Verified Successfully, Now please Login with your Email
                  </p>
                ) : (
                  <p className="text-red-500 text-sm">
                    Error in Verifying your account
                  </p>
                ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
