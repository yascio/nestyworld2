import React, { useState } from 'react';
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const toggleDropdownMenu = () => {
    setDropdownMenu(!dropdownMenu);
  };

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
  <input
    type="text"
    placeholder="Search ..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <IconButton onClick={() => {
    if (!search.trim()) {
      alert("Please type something to search.");
      return;
    }
    navigate(`/properties/search/${search}`);
  }}>
    <Search sx={{ color: variables.pinkred }} />
  </IconButton>
</div>


      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" style={{ textDecoration: 'none' }}>
      <button style={{
        backgroundColor: '#24355A',
        border: 'none',
        color: 'white',
        padding: '12px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <i className="circular-button"></i> Admin Access
      </button>
    </a>
   ) : (
    <a href="/login" style={{ textDecoration: 'none' }}>
    <button style={{
      backgroundColor: '#24355A',
      border: 'none',
      color: 'white',
      padding: '12px 24px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <i className="circular-button"></i> Admin Access
    </button>
  </a>


        )}

<button
      className="navbar_right_account"
      onClick={toggleDropdownMenu}
    >
      <Menu sx={{ color: variables.darkgrey }} />
      {!user ? (
        <Person sx={{ color: variables.darkgrey }} />
      ) : (
        <img
          src={`http://localhost:3001/${user.profileImagePath.replace(
            "public",
            ""
          )}`}
          alt="profile"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      )}
    </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">User Log In</Link>
            <Link to="/register">User Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

