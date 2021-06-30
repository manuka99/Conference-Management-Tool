const { Validation } = require(".");

exports.NewPostRules = [
  Validation.text("title", 10, 100),
  Validation.text("description", 10, 1500),
];

exports.PostApprovalRules = [Validation.boolean("isApproved")];
