import {useCodingStore} from "../store";

function ImageOutput() {
  const {encodedString} = useCodingStore();
  
  return (
    <img className="w-full" alt="output" src={`http://www.plantuml.com/plantuml/svg/${encodedString}`}/>
  );
}

export default ImageOutput;
