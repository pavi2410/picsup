import { useState } from "react";
import { useNavigate } from "react-router";
import { HOST } from "../App";
import { toast } from 'react-toastify';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  let navigate = useNavigate();
  function signup() {
    // perform signup
    fetch(`${HOST}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "username": username
      })
    }).then(res => res.json())
      .then((res) => {
        console.log(res);
        toast("U have entered Nirvana :')", { type: "success" });
        navigate("/login");
      })
      .catch(error => {
        console.log(error);
        toast("Some error occured! Try harder ;)", { type: "error" });
      });
  }

  return (
    <div className="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-green-100">
      <div className="content text-3xl text-center md:text-left">
        <h1 className="text-5xl text-green-500 font-bold pb-4">picsup</h1>
        <p>See with friends and the world around you on picsup.</p>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <div className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <button type="submit" className="w-full bg-green-500 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg" onClick={() => signup()}>Create New Account</button>
          <button
            className="w-full bg-blue-500 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
        <p className="text-center text-sm my-4">
          <span className="font-semibold text-center w-full">View Photos</span> of celebrity, friends or family
        </p>
      </div>
    </div>
  )
}