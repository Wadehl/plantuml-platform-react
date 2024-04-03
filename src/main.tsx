import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// roboto font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// material ui
import { StyledEngineProvider } from "@mui/material/styles";


// monaco editor
import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

// you can change the source of the monaco files
// loader.config({
//   paths: {
//     vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs",
//   },
// });

loader.config({ monaco });

import { CodingStoreProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CodingStoreProvider>
        <App />
      </CodingStoreProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
