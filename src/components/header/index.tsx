import { Link } from "react-router-dom";
import "./index.css";
import { useAuthStore } from "../../stores/auth";
import {
  IconHome2,
  IconLogin,
  IconUser,
  IconUserPlus,
  IconUserSearch,
} from "@tabler/icons-react";
import Avatar from "../avatar";

export default function Header() {
  const user = useAuthStore((state) => state.client);
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <header className="header">
      <nav
        className="header_nav"
        style={{
          display: isAuth ? "flex" : "none",
        }}
      >
        <ul className="header_ul--isAuth">
          <li>
            <Link className="header_link" to="/">
              <IconHome2 />
            </Link>
          </li>
          <li>
            <Link className="header_link" to={`/profiles/${user?.id}`}>
              <IconUser />
            </Link>
          </li>
          <li>
            <Link className="header_link" to="/search">
              <IconUserSearch />
            </Link>
          </li>
          <li>
            <button className="header_link">
              <Avatar
                src={isAuth ? JSON.parse(user!.avatar).secureUrl.secureUrl : ""}
                alt={isAuth ? user!.name : "Login or sign up!"}
                isVerified={isAuth && user!.isVerified}
              />
            </button>
          </li>
        </ul>
      </nav>

      <nav
        className="header_nav"
        style={{
          display: isAuth ? "none" : "flex",
          padding: "1em",
        }}
      >
        <p>Login into Ask!</p>

        <ul className="header_ul--isNotAuth">
          <li>
            <Link
              className="header_link"
              to="/login"
              style={{ color: "var(--color_accent)" }}
            >
              <IconLogin />
            </Link>
          </li>
          <li>
            <Link className="header_link" to="/signup">
              <IconUserPlus />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
