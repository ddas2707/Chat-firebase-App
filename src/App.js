import React, { useState, useRef } from "react";
import "./App.css";
import Auth from "./Components/Auth";
import { auth } from "./firebaseConfig";
import Chat from "./Components/Chat";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(false);

  const roomInputRef = useRef(null);

  //<---------------sign-out-section----------------->
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="roomPage">
          <div className="roomDetails">
            <input
              className="roomInput"
              ref={roomInputRef}
              placeholder="Enter Room-id"
            />
          </div>
          <div className="roomSubmit">
            <button
              className="roomSubmitbtn"
              onClick={(e) => setRoom(roomInputRef.current.value)}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut} className="sign-outbtn">
          SignOut
        </button>
      </div>
    </div>
  );
}

export default App;
