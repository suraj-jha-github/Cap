import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const Navbar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([])
  const history = useHistory();
  const [link, setLink] = useState(true);
  const [isOpen, setOpen] = useState(false);

  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i data-target="modal1" className=" material-icons modal-trigger search-icon" style={{color:"white"}}>
            search
          </i>
        </li>,
        <li key="2">
          <i className="material-icons" 
               
               >
                <Link to="/profile">person</Link> 
               </i>
        </li>,
        <li key="3">
           <i className="material-icons" 
               
                >
                 <Link to="/create">add_circle_outline</Link> 
                </i>
        </li>,
        <li key="4">
         <i className="material-icons" 
               
               >
                <Link to="/myfollowingpost">people</Link> 
               </i>
        </li>,
        <li key="5">
         <i className="material-icons" 
         style={{color:"white"}}
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
           power_settings_new
          </i>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/signin">Signin</Link>
        </li>,
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  const fetchUsers=(query)=>{
    setSearch(query)
    fetch("/search-users",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      console.log(results)
      setUserDetails(results.user)
    })

  }
  return (
    <div className="nav" id={link ? "h-res" : ""}>
      <div className="navleft">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          <h1>SOCIOUT</h1>
        </Link>
      </div>
      <div className="navright" id={link ? "v-res" : ""}>
        <ul>{renderList()}</ul>
      </div>
      <div className="burger" onClick={() => setLink(!link)}>
        <i class="material-icons" toggled={isOpen} toggle={setOpen}>
          dehaze
        </i>
      </div>
      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content">
          <input
            
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map(item=>{
              return <Link to={item._id !==state._id?"/profile/"+item._id:"/profile"} onClick={()=>{
                M.Modal.getInstance(searchModal.current).close()
                setSearch("")
              }}> <li className="collection-item" style={{color:"black"}}>{item.email}</li></Link>
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch("")} >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
