import { useState } from "react";
import axios from "axios";
import { API } from "../../const/api";

function signup() {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API.SIGN_UP, formState);

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default signup;
