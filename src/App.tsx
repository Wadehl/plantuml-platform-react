import "./App.css";

import { useState } from "react";

import CodeInput from "./components/CodeInput.tsx";
import ImageOutput from "./components/ImageOutput.tsx";

import Split from "./components/SplitPane.tsx";

function App() {
  const [rate] = useState(0.5);
  const [direction] = useState("horizontal");

  return (
    <>
      <Split rate={rate} direction={direction}>
        <CodeInput />
        <ImageOutput />
      </Split>
    </>
  );
}

export default App;
