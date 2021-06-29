import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { AttachFile, Description, PictureAsPdf } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    // previewChip: {
    //   minWidth: 160,
    //   maxWidth: 210,
    // },
    root: {
      minHeight: 60,
    },
    text: {
      fontSize: 14,
      fontWeight: "bold",
    },
    icon: {
      height: 30,
    },
    image: {
      height: 30,
    },
    MuiDropzonePreviewList: {
      image: {
        height: 30,
      },
    },
  })
);

export default function Index({ file, handleFileChange }) {
  const classes = useStyles();
  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} />;
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />;
      default:
        return <AttachFile fontSize="small" {...iconProps} />;
    }
  };

  return (
    <DropzoneArea
      initialFiles={[file]}
      acceptedFiles={["application/pdf"]}
      dropzoneText={"Drag and drop or click to select file."}
      onChange={handleFileChange}
      classes={{
        root: classes.root,
        text: classes.text,
        icon: classes.icon,
      }}
      getPreviewIcon={handlePreviewIcon}
      filesLimit={1}
      maxFileSize="26214400 "
    />
  );
}
