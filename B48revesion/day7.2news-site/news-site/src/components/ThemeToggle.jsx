import useTheme from '../hooks/useTheme.js'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      aria-label="Toggle theme"
      title="Toggle dark/light"
    >
      {theme === 'dark' ? ' Dark' : ' Light'}
    </button>
  )
}
