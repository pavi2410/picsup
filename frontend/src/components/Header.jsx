import { useState, useEffect } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router';

export default function Header({ setmodalOverlay }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode])

  function logout() {
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
    <nav className="flex flex-row justify-between items-center py-8 px-16">
      <div className="flex flex-row items-center gap-x-4">
        <div>
          <h1 className="font-bold tracking-wider text-2xl text-green-500">picsup</h1>
        </div>
        <label className="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <GoSearch className="w-4 h-4 text-gray-500 pointer-events-none fill-current" />
          </span>
          <input type="text" placeholder="Search by name" className="py-3 pr-3 pl-9 bg-clip-content rounded-xl border-2 bg-transparent dark:text-white" />
        </label>
      </div>
      <div className="flex items-center gap-8">
        {darkMode
          ? <MdOutlineDarkMode className="h-12 w-12 bg-white rounded-full border-black p-2" onClick={() => setDarkMode(!darkMode)} />
          : <MdDarkMode className="h-12 w-12 rounded-full border-black p-2" onClick={() => setDarkMode(!darkMode)} />
        }
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