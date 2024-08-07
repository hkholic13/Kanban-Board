import { useEffect, useState } from "react";

import { StyledSidebar } from "./styles";

import Button from "../Utils/Button";
import BoardsList from "./BoardsList";
import NewBoard from "./NewBoard";

import Menu from "../../assets/menu.png";
import Close from "../../assets/close.png";

import { useNavigate, Link, useLocation } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsNewBoardOpen(false);
  }, [location]);

  return (
    <>
      <NewBoard
        open={isNewBoardOpen}
        onClose={() => setIsNewBoardOpen(false)}
      />
      <button
        className={`openSidebar ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <img src={Menu} />
      </button>
      <StyledSidebar
        isOpen={isOpen}
        className={`${isOpen ? "openedAnimation" : ""}`}
      >
        <div>
          <Link to="/" aria-label="go to home">
            <h1>Kanban</h1>
          </Link>

          <button className="closeSidebar" onClick={() => setIsOpen(false)}>
            <img src={Close} />
          </button>
        </div>

        {user ? (
          <>
            <BoardsList />
            <Button
              onClick={() => setIsNewBoardOpen(true)}
              text="+ Add New Board"
              height="50px"
              width="85%"
            />
          </>
        ) : (
          <div className="login">
            <Button
              onClick={() => navigate("/login")}
              text="Login"
              height="50px"
              width="85%"
              variant={true}
            />
            <Button
              onClick={() => navigate("/register")}
              text="Register"
              height="50px"
              width="85%"
              variant={true}
            />
          </div>
        )}
        <a
          href="https://github.com/jaoincode"
          target="_blank"
          className="github"
          aria-label="visit jaoincode github"
        >
          @hk
        </a>
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
