import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { useAuthStore, AuthState } from "../../store";
import { PostItem } from "./PostItem";
import { RouteComponentProps } from "react-router-dom";
import PopupComponent from "./popUpComponent";
import { useIndexedDB } from "react-indexed-db";
interface locPro {
  state: {
    id: number;
  };
}
type locprops = {
  location: locPro;
};

interface Props extends RouteComponentProps<any> {}

type PostProps = Props & locprops;
const Index: React.FC<PostProps> = ({ history, location }) => {
  const { deleteRecord } = useIndexedDB("user");
  const { posts, loadPosts, name, logOut } = useAuthStore();
  const postsLoaded:boolean = useAuthStore(state => state.postsLoaded);

  const [popUpOpen, setPopUp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const activatePopUp = () => {
    setPopUp(!popUpOpen);
  };

  const switchOpenMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutEvent = () => {
    // to do
    const id = location.state.id;
    deleteRecord(id).then((succ) => console.log("completado"));
    logOut().then((succ) => history.push("/"));
  };

  const closePopUp = () => {
    setPopUp(false);
  };
 
  useEffect(() => {
    loadPosts();
    console.log("use effect");
  }, []);

  useEffect(()=>{
   // if post loaded are false token expiration return
   if (!postsLoaded && !(posts.length > 0)) {
  
    history.push("/email");
    console.log("no hay posts");
  }
  },[posts])
  return (
    <>
      <div className="mainContainer">
        <div className="header">
          {name}

          {showMenu ? (
            <>
              <div className="icon" onClick={switchOpenMenu}>
                &and;{" "}
              </div>
            </>
          ) : (
            <>
              <div className="icon" onClick={switchOpenMenu}>
                &or;{" "}
              </div>
            </>
          )}

          <div
            className="dropDown"
            style={{
              opacity: showMenu ? "1" : "0",
              visibility: showMenu ? "visible" : "hidden",
              transform: showMenu
                ? "scale(1) translateX(0)"
                : "scale(0.89) translateX(20px)",
              position: "absolute",
              zIndex: 50,
              background: "white",
              transition: "all .2s ease-in",
              border: "1px solid #b3b3b3",
              padding: "0 18px",
              borderRadius: "21px",
              top: "3rem",
              cursor: "pointer",
            }}
          >
            <p onClick={logoutEvent}>Logout</p>
          </div>
        </div>

        <div className="posts">
          {posts.length > 0 && postsLoaded &&
            posts.map(({ title, content, image }) => (
              <>
                <PostItem
                  key={title}
                  title={title}
                  content={content}
                  image={image}
                />
              </>
            ))}
        </div>

        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="flexc-center bottom-position">
          <button onClick={activatePopUp}>Add New</button>
        </div>
      </div>
      {/* open popup */}
      {popUpOpen ? (
        <>
          <PopupComponent closePopup={closePopUp} />
        </>
      ) : null}
    </>
  );
};

export default withRouter(Index);
