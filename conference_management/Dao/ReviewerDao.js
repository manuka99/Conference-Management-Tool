const Reviewer = require("../Schemas/Reviewer");

exports.createNewReviewer = async (data) => {
  var reviewer = await Reviewer.create(data);
  reviewer.password = null;
  return reviewer;
};

exports.updateReviewer = async (id, data) => {
  var reviewer = await Reviewer.findByIdAndUpdate(id, data, {
    useFindAndModify: false,
  });
  return reviewer;
};
