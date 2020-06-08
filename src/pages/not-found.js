import React from "react";
import Layout from '../components/shared/Layout'
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return <Layout minNav marginTop={120} title="Page Not Found">
    <Typography variant="h5" align="center" paragraph>
      Sorry, this page isn't availiable.
    </Typography>
    <Typography align="center">
      The link you followed may be broken, or the page may have been removed.
    <Link to="/">
    {" "}
      <Typography color="primary" component="span">
        Go back to Anti Social Social Media.
      </Typography>
    </Link>
    </Typography>
  </Layout>
}

export default NotFoundPage;
