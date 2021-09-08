import React, { useState } from "react";
import { useStyles } from "./../Styles";

import UserData from "./../data/UserData";

export default function User() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <UserData />
    </div>
  );
}
