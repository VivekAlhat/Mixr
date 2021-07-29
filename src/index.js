import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Global, css } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import "./index.css";

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
