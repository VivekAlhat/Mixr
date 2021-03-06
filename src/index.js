import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "focus-visible/dist/focus-visible";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { PostsProvider } from "./context/PostsContext";
import { Global, css } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <UserProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
