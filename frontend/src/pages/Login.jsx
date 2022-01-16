import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../auth";
import { toast } from 'react-toastify';
import { useMutation } from 'react-query'
import { loginUser } from '../api/users'

export default function Login() {
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(loginUser)

  function login() {
    loginMutation.mutateAsync({ email, password })
      .then((res) => {
        toast.success("Welcome to picsup!!");
        auth.setToken(res.data.token);
        navigate(from, { replace: true });
      })
      .catch(error => {
        toast.error("Some error occured! Try harder ;)");
      });
  }

  return (
    <div className="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-blue-100">
      <div className="content text-3xl text-center md:text-left">
        <h1 className="text-5xl text-blue-500 font-bold pb-4">picsup</h1>
        <p>See with friends and the world around you on picsup.</p>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <div className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
          />
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg"
            onClick={() => login()}
          >
            Login
          </button>
          <a className="text-blue-400 text-center my-2">Forgot Pasword?</a>
          <button
            className="w-full bg-green-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            onClick={() => navigate("/signup")}
          >
            Create New Account
          </button>
        </div>
        <p className="text-center text-sm my-4">
          <span className="font-semibold text-center w-full">View Photos</span>
          {" "}
          of celebrity, friends or family
        </p>
      </div>
    </div>
  );
}
