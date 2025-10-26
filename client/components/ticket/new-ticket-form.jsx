import { useState } from "react";
import { useRequest } from "../../hooks/use-request";
import { API } from "../../const/api";
import Router from "next/router";

function NewTicketForm() {
  const [formState, setFormState] = useState({ title: "", price: "" });

  const { doRequest, errors } = useRequest({
    url: API.TICKET,
    method: "post",
    body: formState,
    onSuccess: (ticket) => Router.push("/"),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const onBlur = (e) => {
    const value = parseFloat(formState.price);
    setFormState((prev) => ({ ...prev, price: value.toFixed(2) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={formState.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={formState.price}
            onBlur={onBlur}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <br />
        {errors}
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default NewTicketForm;
