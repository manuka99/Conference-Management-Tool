exports.GuestUser = (req, res, next) => {
  console.log(req);
  if (req.user)
    return res.status(422).json({ msg: "You are already authenticated" });
  else return next();
};
