import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import socket from "../../socket";
import Room from "../Room/Room";

const Main = () => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showRoom, setShowRoom] = useState(false);
  const [roomName, setRoomName] = useState(""); // Store room name in state
  const [userName, setUserName] = useState(""); // Store user name in state

  useEffect(() => {
    socket.on("FE-error-user-exist", ({ error }) => {
      if (!error) {
        sessionStorage.setItem("user", userName); // Store user name in session storage
        setShowRoom(true); // Show the room once the user is validated
      } else {
        setErr(true);
        setErrMsg("User name already exists");
      }
    });
  }, [userName]);

  function clickJoin() {
    const room = roomRef.current.value;
    const user = userRef.current.value;

    if (!room || !user) {
      setErr(true);
      setErrMsg("Enter Room Name or User Name");
    } else {
      setRoomName(room); // Set room name in state
      setUserName(user); // Set user name in state
      socket.emit("BE-check-user", { roomId: room, userName: user });
    }
  }

  return (
    <div>
      {!showRoom ? (
        <MainContainer>
          <Row>
            <Label htmlFor="roomName">Room Name</Label>
            <Input type="text" id="roomName" ref={roomRef} />
          </Row>
          <Row>
            <Label htmlFor="userName">User Name</Label>
            <Input type="text" id="userName" ref={userRef} />
          </Row>
          <JoinButton onClick={clickJoin}> Join </JoinButton>
          {err ? <Error>{errMsg}</Error> : null}
        </MainContainer>
      ) : (
        <div>
          <Room roomId={roomName} /> {/* Pass roomName from state */}
        </div>
      )}
    </div>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default Main;
