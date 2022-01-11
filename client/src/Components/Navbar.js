import React, {useState} from "react";
import "../App.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";

function Navbar() {

    const[showLinks, setShowLinks] = useState(false);

  return (
    <div className="Navbar">
      <div className="leftSide">
      <div className="links" id ={showLinks ? "hidden" : ""}>
        <a href="/Home">Home</a>
        <a href="/Login">Login</a>
        <a href="/Register">Register</a>       
      </div>
      <button onClick={() => setShowLinks(!showLinks)}>
          <ReorderIcon />
          </button>
    </div>
    <div className="rightSide">
        <input type="text" placeholder="Search..."/>
        <button>
            <SearchIcon />
        </button>
    </div>
    </div>
  );
}

export default Navbar;
