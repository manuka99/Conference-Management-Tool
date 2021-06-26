const Editor = require("../Schemas/Editor");

exports.createNewEditor = async (data) => {
  var editor = await Editor.create(data);
  editor.password = null;
  return editor;
};

exports.updateEditor = async (id, data) => {
  var editor = await Editor.findByIdAndUpdate(id, data, {
    useFindAndModify: false,
  });
  return editor;
};
