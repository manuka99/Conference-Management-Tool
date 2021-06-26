const Enum = require("enum");

const UserEnum = new Enum({
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  REVIEWER: "REVIEWER",
  MEMBER: "MEMBER",
});

const MemberEnum = new Enum({
  RESEARCHER: "RESEARCHER",
  PRESENTER: "PRESENTER",
  ATTENDEE: "ATTENDEE",
  INNOVATOR: "INNOVATOR",
});

module.exports = { UserEnum, MemberEnum };
