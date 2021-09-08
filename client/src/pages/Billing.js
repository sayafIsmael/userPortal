import React from "react";
import UserSubscription from "./../data/UserSubscription";
import CallUsage from "./../data/CallUsage";

export default function Billing() {
  return (
    <>
      <UserSubscription />
      <CallUsage/>
    </>
  );
}
