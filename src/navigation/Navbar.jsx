import { Link } from "react-router-dom";
import menuItems from "./../json/menuItems.json";

export default function Navbar() {
  return (
    <div className="navbar bg-transparent w-full">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">
        <Link to="/" className="btn bg-transparent hover:bg-stone-900/20 text-xl border-none">We Invite</Link>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link className="btn bg-transparent hover:bg-stone-900/20 border-none" to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
