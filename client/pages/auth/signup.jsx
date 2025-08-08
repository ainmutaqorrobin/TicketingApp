import { useState } from "react";
import axios from "axios";
import { API } from "../../const/api";
import { useRequest } from "../../hooks/use-request";

function signup() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { doRequest, errors } = useRequest({
    url: API.SIGN_UP,
    method: "post",
    body: formState,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default signup;
