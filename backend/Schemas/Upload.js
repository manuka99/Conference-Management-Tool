const User = require("./User");

const { Schema, model } = require("mongoose");

const UploadSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    path: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
    },
    size: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.String,
      required: false,
    },
    notes: {
      type: Schema.Types.String,
      required: false,
    },
  },
  { timestamps: true }
);

const Upload = model("upload", UploadSchema);
module.exports = Upload;
