import { useState } from "react";
import { HOST } from "../App";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    // perform login
    console.log("Login", email, password);
    // fetch(`${HOST}/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       "email": email,
    //       "password": password
    //     })
    //   }).then(response => response.json())
    //   .then((responseJson) => console.log(responseJson))
    // .catch(error => console.log(error));
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   "email": email,
    //   "password": password,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   mode: 'no-cors',
    // };

    // fetch(`${HOST}/login`, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  }

  return (
    <div className="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-blue-100">
      <div className="content text-3xl text-center md:text-left">
        <h1 className="text-5xl text-blue-500 font-bold pb-4">picsup</h1>
        <p>See with friends and the world around you on picsup.</p>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
          />
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg"
            onClick={login}
          >
            Login
          </button>
          <a className="text-blue-400 text-center my-2">Forgot Pasword?</a>
          <hr />
          <button
            className="w-full bg-green-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
            onClick={() => redirect()}
          >
            Create New Account
          </button>
        </form>
        <p className="text-center text-sm my-4">
          <span className="font-semibold text-center w-full">View Photos</span>
          {" "}
          of celebrity, friends or family
        </p>
      </div>
    </div>
  );
}
