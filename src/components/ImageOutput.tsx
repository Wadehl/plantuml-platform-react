import { Card, CardMedia, CardActions } from "@mui/material";

import { useCodingStore } from "../store";

function ImageOutput() {
  const { encodedString } = useCodingStore();

  return (
    <Card>
      <CardMedia
        component="img"
        height="100%"
        image={`http://www.plantuml.com/plantuml/svg/${encodedString}`}
      />
      <CardActions>
        <a
          href={`http://www.plantuml.com/plantuml/uml/${encodedString}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in PlantUML
        </a>
      </CardActions>
    </Card>
  );
}

export default ImageOutput;
