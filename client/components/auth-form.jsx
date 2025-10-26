import Router from "next/router";
import { useState } from "react";
import { useRequest } from "../hooks/use-request";
import { API } from "../const/api";
import { useUserState } from "../context/user-context";

function AuthForm({ isLogin = false }) {
  const { setCurrentUser } = useUserState();
  const [formState, setFormState] = useState({ email: "", password: "" });
  
  const { doRequest, errors } = useRequest({
    url: isLogin ? API.SIGN_IN : API.SIGN_UP,
    method: "post",
    body: formState,
    onSuccess: async (data) => {
      const res = await fetch(API.CURRENT_USER);
      const { currentUser } = await res.json();
      setCurrentUser(currentUser);

      Router.push("/");
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1> {isLogin ? "Sign In" : "Sign Up"}</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={formState.email}
          onChange={handleChange}
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={formState.password}
          onChange={handleChange}
          className="form-control"
          id="password"
        />
      </div>
      {errors}
      <br />
      <button className="btn btn-primary">
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default AuthForm;
