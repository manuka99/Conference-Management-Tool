exports.RoleAuth = (roles) => (req, res, next) => {
  console.log(roles);
  console.log(req.user.role);
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ message: "Permision denied!", success: false });
};
