import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useIndexedDB } from "react-indexed-db";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useAuthStore, AuthState } from "../../store";
import Swal from 'sweetalert2'
type Location = {
  state: {
    id: string | number;
  };
};

type History = {
    push: (route:string) => void
}
interface Props {
  loading?: boolean;
  location: Location;
  history:History;
}

interface props extends RouteComponentProps<any> {
    loading:boolean;
    
  } 

  type propsDefault = Props & props;

const Index: React.FC<propsDefault> = ({ location, history }) => {
  const { signInAction } = useAuthStore();

  const { getByID } = useIndexedDB("user");
  const [email, setEmail] = useState(null);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("passworth");

  const signIn = () => {
    // action log in
    signInAction(password).then((response) => {
      if (response) {
        history.push({
            pathname:"/posts",
            state:{id}
        });
        
      } else {
        Swal.fire({
            title:"Auth error",
            text:"Password or Eamil invalid please validate",
            icon:"error"
        });
        history.push("/email");

      }
    });

    // redirect to posts component
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const goBack = () => {
    history.push("/");
  }

  useEffect(() => {
    const id = location.state.id as string;
    setId(id);
    getByID(id).then((user) => {
      // alert(JSON.stringify(user.email));
      setEmail(user["email"]);
    });
  }, []);
  return (
    <>
      <div className="mainContainer">
      <p className="backButton" onClick={goBack}>&lt;</p>
        <div className="flexc-center">
          <p className="lead">
            <b>{email}</b>
          </p>
        </div>
        <div>
          <input type="password" placeholder="password" value={password} onChange={onChange} />
        </div>
        <div className="spacer"></div>
        <div className="remember-container">
          <input type="checkbox" className="checkBoxButton" />
          <p>Remember?</p>
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="flexc-center mt-md">
          <button onClick={signIn}>SIGN IN</button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Index);
