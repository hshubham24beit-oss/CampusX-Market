import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiPackage,
  FiMessageCircle,
} from "react-icons/fi";

const menu = [
  {
    title: "Home",
    path: "/",
    icon: <FiHome />,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <FiGrid />,
  },
  {
    title: "All Products",
    path: "/products",
    icon: <FiShoppingBag />,
  },
  {
    title: "My Orders",
    path: "/orders",
    icon: <FiPackage />,
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <FiMessageCircle />,
  },
];

function MenuBar() {
  return (
    <div className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto h-14 px-8 flex items-center gap-12">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 h-full font-medium border-b-2 transition ${
                isActive
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-purple-600"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}

      </div>

    </div>
  );
}

export default MenuBar;