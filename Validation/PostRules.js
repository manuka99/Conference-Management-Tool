const { Validation } = require(".");

exports.NewPostRules = [
  Validation.text("title", 10, 40),
  Validation.text("description", 20, 500),
];

exports.PostApprovalRules = [Validation.boolean("isApproved")];
