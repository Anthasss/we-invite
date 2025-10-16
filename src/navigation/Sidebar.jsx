import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import menuItems from "./../json/menuItems.json";

export default function Sidebar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const getAvatarUrl = () => {
    if (user?.picture) {
      return user.picture;
    }
    const fullName = `${user?.given_name || ''} ${user?.family_name || ''}`.trim() || user?.name || user?.email || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;
  };

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-secondary min-h-full w-80 p-4 pt-16">
        {/* Sidebar content here */}
        {menuItems.map((item) => (
          <li key={item.title}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
        
        {!isLoading && (
          <>
            <div className="divider mt-auto"></div>
            {isAuthenticated ? (
              <>
                <li className="menu-title">
                  <div className="flex items-center gap-2">
                    <img src={getAvatarUrl()} alt={user?.name || "User"} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-xs opacity-70">{user?.email}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => loginWithRedirect()}>
                  Log In
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
