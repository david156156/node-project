import { FunctionComponent } from "react";
import { useUser } from "../contexts/UserContext";
import { NavLink } from "react-router-dom";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const { user } = useUser();
  return (
    <>
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Navigation</h5>
              <ul className="list-unstyled">
                <li>
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="text-white">
                    About
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink to="/my-cards" className="text-white">
                        My Cards
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/fav-cards" className="text-white">
                        Fav cards
                      </NavLink>
                    </li>
                    {user.isAdmin && (
                      <li>
                        <NavLink to="/admin" className="text-white">
                          Admin
                        </NavLink>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <p>Email: support@businesscardmanager.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://facebook.com" className="text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" className="text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" className="text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <p>
              &copy; {new Date().getFullYear()} Business Card Manager. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
