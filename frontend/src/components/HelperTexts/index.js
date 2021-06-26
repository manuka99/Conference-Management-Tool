import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
}));

function Index({ texts, variant, color }) {
  const classes = useStyles();
  return (
    <span className={classes.row}>
      {texts.map((text, index) => {
        return (
          <Typography
            key={index}
            variant={variant ? variant : "caption"}
            color={color ? color : "secondary"}
          >
            {text}
          </Typography>
        );
      })}
    </span>
  );
}

export default Index;
