import { useRouter } from "next/router";
import { API } from "../../const/api";
import { useRequest } from "../../hooks/use-request";

function OrderTicketForm({ ticket }) {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: API.ORDER,
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (order) => console.log(order),
  });

  if (!ticket) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">Ticket not found 😢</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm border-0 rounded-3 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body p-4">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="card-title mb-0 text-primary fw-bold">
              {ticket.title}
            </h3>
            <span className="badge bg-secondary text-uppercase">
              #{ticket.id.slice(-6)}
            </span>
          </div>

          {/* Price Section */}
          <div className="my-4">
            <h4 className="text-success fw-semibold mb-0">
              ${ticket.price.toFixed(2)}
            </h4>
            <small className="text-muted">Price per ticket</small>
          </div>

          {/* Divider */}
          <hr />

          {/* Meta Info */}
          <div className="text-muted mb-4">
            <p className="mb-1">
              <strong>Version:</strong> {ticket.version}
            </p>
          </div>
          {errors}

          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => router.back()}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Tickets
            </button>
            <button className="btn btn-success" onClick={doRequest}>
              <i className="bi bi-cart-check me-1"></i> Purchase Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTicketForm;
