import { Link, useLocation } from "react-router-dom";
import React, { useState, useLayoutEffect, useCallback } from "react";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 35,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Header = ({ theme = "dark", setTheme }) => {
  const location = useLocation();
  const [node, setNode] = useState(null);
  const [height, setHeight] = useState(0);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => {
        setHeight(node.getBoundingClientRect().height);
      };

      window.addEventListener("resize", measure);

      return () => {
        window.removeEventListener("resize", measure);
      };
    }
  }, [node, height]);

  const getLinkClassName = (path) => {
    const linkState = location.pathname === path ? "active" : "";

    return `Header__content-center-link Custom__link ${linkState}`;
  };

  const getSideMenuClassName = () => {
    return `Header__sideMenu open-${sideMenuOpen}`;
  };

  const getToggleClassName = () => {
    return `Header__sideMenuToggle active-${sideMenuOpen}`;
  };

  return (
    <div className="Header" ref={measuredRef}>
      <div className="Header__content">
        <div className="Header__content-logo">
          <Link className="Header__content-logo-link Custom__link" to="/">
            FIFAdb
          </Link>
        </div>
        <div className="Header__content-center">
          <Link className={getLinkClassName("/players")} to="/players">
            PLAYERS
          </Link>
          <Link className={getLinkClassName("/teams")} to="/teams">
            TEAMS
          </Link>
        </div>
        <div className="Header__content-right">
          <MaterialUISwitch />
          <Divider orientation="vertical" flexItem />
          <Link className="Header__content-right-link Custom__link" to="/login">
            LOGIN <LoginIcon />
          </Link>
        </div>

        <div className={getSideMenuClassName()}>
          <div className="Header__sideMenu-content">
            <Link className={getLinkClassName("/players")} to="/players">
              PLAYERS
            </Link>
            <Link className={getLinkClassName("/teams")} to="/teams">
              TEAMS
            </Link>
            <div className="Header__sideMenu-content-switch">
              <MaterialUISwitch />
            </div>
            <Divider orientation="vertical" flexItem />
            <Link
              className="Header__content-right-link Custom__link"
              to="/login"
            >
              LOGIN <LoginIcon />
            </Link>
          </div>
        </div>

        <div className={getToggleClassName()}>
          <IconButton onClick={() => setSideMenuOpen(!sideMenuOpen)}>
            {sideMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
