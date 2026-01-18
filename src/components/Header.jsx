function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>Farm2Fork Hub</h1>
          <p>Connecting local kitchens with local producers</p>
        </div>
        <button className="theme-toggle" onClick={onToggleDarkMode} aria-label="Toggle dark mode">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;
