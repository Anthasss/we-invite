import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import menuItems from "./../json/menuItems.json";

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const getAvatarUrl = () => {
    if (user?.picture) {
      return user.picture;
    }
    const fullName = `${user?.given_name || ''} ${user?.family_name || ''}`.trim() || user?.name || user?.email || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;
  };

  return (
    <div className="navbar bg-transparent w-full absolute z-100">
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
      {!isLoading && (
        <div className="flex-none">
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={user?.name || "User"}
                    src={getAvatarUrl()}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</a></li>
              </ul>
            </div>
          ) : (
            <button 
              className="btn bg-transparent hover:bg-stone-900/20 border-none"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          )}
        </div>
      )}
    </div>
  );
}
