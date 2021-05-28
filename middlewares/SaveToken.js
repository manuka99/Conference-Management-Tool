const JWTToken = require("../models/JWTToken");

exports.SaveToken = async (req, res, next) => {
  if (req.user) {
    const token = req.header("authorization");
    const jwtToken = {};
    jwtToken = await JWTToken.findOne({ token });
    if (!jwtToken || !jwtToken._id) jwtToken = new JWTToken();

    const useragent = req.useragent;
    console.log(useragent);
    // jwtToken.user_id = useragent;
    // jwtToken.ip_address = xsdsdsd;
    //   jwtToken.user_agent = useragent;

    // jwtToken.deviceType = xsdsdsd;
    // jwtToken.deviceInfo = xsdsdsd;
    // jwtToken.osInfo = xsdsdsd;
    // jwtToken.brand = xsdsdsd;
    // jwtToken.model = xsdsdsd;
    // jwtToken.payload = xsdsdsd;
    // jwtToken.last_activity = xsdsdsd;
    // jwtToken.isValid = true;
  }
  next();
};
