import Router from "next/router";
import { API } from "../../const/api";
import { useRequest } from "../../hooks/use-request";
import { useEffect } from "react";
import { useUserState } from "../../context/user-context";

function signout() {
  const { setCurrentUser } = useUserState();
  const { doRequest } = useRequest({
    url: API.SIGN_OUT,
    method: "post",
    body: {},
    onSuccess: () => {
      setCurrentUser(null);
      Router.push("/");
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
}

export default signout;
