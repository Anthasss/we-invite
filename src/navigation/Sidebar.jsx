import { Link } from "react-router-dom";
import menuItems from "./../json/menuItems.json";

export default function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        {/* Sidebar content here */}
        {menuItems.map((item) => (
          <li key={item.title}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
