import {Link, NavLink, Redirect} from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import SpinnerLoading from "../utils/SpinnerLoading";

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();

  if(!authState){
    return <SpinnerLoading/>
  }

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Library App</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className={'nav-link'}>
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className={'nav-link'}>
              <NavLink className="nav-link" to="/search">
                Search Books
              </NavLink>
            </li>
            {authState.isAuthenticated && !authState?.accessToken?.claims.userType &&
                <>
                  <li className={'nav-link'}>
                    <NavLink className={'nav-link'} to={'/shelf'}>Shelf</NavLink>
                  </li>
                  <li className={'nav-link'}>
                    <NavLink className={'nav-link'} to={'/messages'}>Messages</NavLink>
                  </li>
                  <li className={'nav-link'}>
                    <NavLink className={'nav-link'} to={'/payments'}>Payments</NavLink>
                  </li>
                </>
            }
            {authState.isAuthenticated && authState?.accessToken?.claims.userType &&
                <>
                  <li className={'nav-link'}>
                  <NavLink className={'nav-link'} to={'/shelf'}>Shelf</NavLink>
                </li>
                  <li className={'nav-link'}>
                    <NavLink className={'nav-link'} to={'/admin'}>Admin Services</NavLink>
                  </li>
                </>
            }
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ?
            <li className="nav-item">
              <Link to={'/login'} type="button" className="btn btn-outline-light">
                Log In
              </Link>
            </li>
            :
            <li className="nav-item">
              <button type="button" className="btn btn-outline-light" onClick={handleLogout}>
                Log Out
              </button>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};