import { Link, Outlet } from "react-router-dom";

function CharacterLayout() {
  return (
    <div className="flex flex-1 border-collapse px-4 border">
      <nav className="flex flex-col border-e py-2 w-[150px]">
        <Link to="/character">Overview</Link>
        <Link to="/character/create">Create</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default CharacterLayout;
