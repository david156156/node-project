import { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../services/userService";
import { useUser } from "../contexts/UserContext";
import { ThemeContext } from "../contexts/ThemeContext";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { darkMode, toggleTheme, searchTerm, setSearchTerm } =
    useContext(ThemeContext);
  const { token, setToken, user } = useUser();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // onSearch(event.target.value);
  };

  const handleLogout = () => {
    setToken(null);
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            BCard
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvas"
            aria-controls="navbarOffcanvas"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-start bg-dark"
            tabIndex={-1}
            id="navbarOffcanvas"
            aria-labelledby="navbarOffcanvasLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title text-light"
                id="navbarOffcanvasLabel"
              >
                Menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    ABOUT
                  </NavLink>
                </li>
                {user?._id && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      FAV CARDS
                    </NavLink>
                  </li>
                )}
                {user?.isBusiness && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      MY CARDS
                    </NavLink>
                  </li>
                )}
              </ul>

              <div className="d-flex flex-column flex-lg-row align-items-start">
                <form className="d-flex mb-3 mb-lg-0 me-lg-3">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {/* <button className="btn btn-outline-light" type="submit">
                    Search
                  </button> */}
                </form>

                <div className="d-flex flex-column flex-lg-row gap-2">
                  <button
                    onClick={toggleTheme}
                    className="btn btn-outline-light"
                  >
                    {darkMode ? "☀️" : "🌙"}
                  </button>
                  {user?._id ? (
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-light"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <NavLink className="btn btn-outline-light" to="/login">
                        Login
                      </NavLink>
                      <NavLink className="btn btn-light" to="/signup">
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
