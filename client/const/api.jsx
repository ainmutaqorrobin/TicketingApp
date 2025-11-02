export const API = {
  CURRENT_USER: "/api/users/currentuser",
  SIGN_UP: "/api/users/signup",
  SIGN_IN: "/api/users/signin",
  SIGN_OUT: "/api/users/signout",

  TICKET: "/api/tickets",
  ORDER: "/api/orders",
};

// This is the URL for the ingress controller in a Kubernetes cluster.
// It is used to route external traffic to the appropriate service within the cluster.
// combining <service-name>.<namespace>.svc.cluster.local
export const INGRESS_URL =
  "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";
