import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Room from "./components/Room/Room";
// import styled from "styled-components";

function WebRtc() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route exact path="/" element={<Main />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(8px + 2vmin);
//   color: white;
//   background-color: #454552;
//   text-align: center;
// `;

export default WebRtc;
