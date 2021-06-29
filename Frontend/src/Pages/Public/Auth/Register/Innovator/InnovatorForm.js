import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HelperTexts from "../../../../../components/HelperTexts";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Upload from "../../../../../components/Upload";

export default function Index({ file, handleUpload, errors }) {
  return (
    <>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        <strong>Innovation details</strong>
      </Typography>

      <CardActionArea>
        <CardMedia
          component="img"
          alt="Innovation"
          height="200"
          width="200"
          image="/static/images/innovation.jpg"
          title="Innovation"
        />
        <CardContent>
          <Typography gutterBottom variant="body2">
            <b> What we look for?</b>
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Innovation is the practical implementation of ideas that result in
            the introduction of new goods or services or improvement in offering
            goods or services. ISO TC 279 on innovation management proposes in
            the standards, ISO 56000:2020 to define innovation as "a new or
            changed entity creating or redistributing value".
          </Typography>
          <Button size="small" color="primary" variant="outlined">
            Learn More
          </Button>
        </CardContent>
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant="body2">
          <b>Need opportunity? Submit us your idea</b>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Innovation is the practical implementation of ideas that result in the
          introduction of new goods or services or improvement in offering goods
          or services.
        </Typography>
        <Typography variant="caption" gutterBottom>
          <br />
          {errors.file && <HelperTexts texts={errors.file} />}
          (Maximum file size allowed = 25mb)
        </Typography>
        <Upload handleFileChange={handleUpload} file={file} />
      </CardContent>
    </>
  );
}
