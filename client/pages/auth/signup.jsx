import { useState } from "react";
import axios from "axios";
import { API } from "../../const/api";

function signup() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API.SIGN_UP, formState);

      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default signup;
