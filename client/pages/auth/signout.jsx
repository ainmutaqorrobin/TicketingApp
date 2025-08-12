import Router from "next/router";
import { API } from "../../const/api";
import { useRequest } from "../../hooks/use-request";
import { useEffect } from "react";

function signout() {
  const { doRequest } = useRequest({
    url: API.SIGN_OUT,
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
}

export default signout;
