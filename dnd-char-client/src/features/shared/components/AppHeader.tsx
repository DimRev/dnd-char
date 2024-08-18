import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <header className="flex justify-between items-center border-collapse px-4 py-2 border shrink">
      <Link to="/">
        <div>DnD Character</div>
      </Link>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/character">Character</Link>
      </nav>
    </header>
  );
}

export default AppHeader;
