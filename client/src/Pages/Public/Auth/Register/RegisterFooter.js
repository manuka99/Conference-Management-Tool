import React from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Link as Link_NAV } from "react-router-dom";

export default function RegisterFooter() {
  return (
    <Grid container>
      <Grid item xs>
        <Link
          component={Link_NAV}
          to="/public/auth/recover-password"
          variant="body2"
        >
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link component={Link_NAV} to="/public/auth/login" variant="body2">
          Already have an account? Sign In
        </Link>
      </Grid>
    </Grid>
  );
}
