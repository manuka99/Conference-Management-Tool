import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as Link_NAV } from "react-router-dom";

export default function Success() {
  const [timeout, setTimeoutValue] = useState(5);

  useEffect(() => {
    if (timeout > 0)
      setTimeout(() => {
        setTimeoutValue(timeout - 1);
      }, 1000);
  }, [timeout]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <b>You have registered to the system successfully!</b>
      </Typography>
      <Typography variant="body2">
        Your registration was completed but our team / administrators will check
        your profile and validate it manually, This may take a couple of hours.
        Approval status will be mailed to you, therefore please check your mail.
      </Typography>
      <br />
      <Typography variant="body">
        <strong>
          If you were not redirrected automatically within {timeout} seconds,
          please{" "}
        </strong>
      </Typography>
      <Link component={Link_NAV} to="/" replace={true} variant="body2">
        click here
      </Link>
    </React.Fragment>
  );
}
