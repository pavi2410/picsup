import { useState, useEffect } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { useNavigate } from 'react-router';

export default function Header({ setmodalOverlay }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const logout = (e) => {
    window.localStorage.clear();
    window.location.reload();
  }

  function handleOptionSelect(option) {
    switch (option) {
      case 'images':
        navigate('/me/images')
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  }

  return (
    <nav className="flex flex-row justify-between items-center p-8">
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <h1 className="font-bold tracking-wider text-2xl text-green-500">picsup</h1>
        </div>
        {/* <div className="flex flex-row justify-center items-center rounded-xl border-2 !hidden">
          <svg className="z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
            </path>
          </svg>
          <input type="text" placeholder="Search by name" className="p-3 focus:ouline-none bg-clip-content" />
        </div> */}
      </div>
      <div className="flex items-center gap-8">
        {darkMode ? <MdOutlineDarkMode className="h-12 w-12 bg-white rounded-full border-black p-2" onClick={() => setDarkMode(!darkMode)} />
          : <MdDarkMode className="h-12 w-12 rounded-full border-black p-2" onClick={() => setDarkMode(!darkMode)} />}
        <button className="bg-green-500 text-white rounded-xl p-3 font-semibold shadow" onClick={() => setmodalOverlay(true)}>Add a photo</button>
        <select className="bg-transparent dark:text-white border-0 p-3 rounded-xl" onChange={e => handleOptionSelect(e.target.value)}>
          <option className="font-semibold shadow hidden">{window.localStorage.getItem('username')}</option>
          <option className="bg-green-500 text-white font-semibold shadow h-8" value="images">My images</option>
          <option className="bg-green-500 text-white font-semibold shadow h-8" value="logout">logout</option>
        </select>
      </div>
    </nav>
  )
}