import { Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

export default function DarkThemeToggle() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Switch
      isSelected={darkMode}
      onValueChange={setDarkMode}
      color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      aria-label='Dark mode toggle'
    />
  )
}