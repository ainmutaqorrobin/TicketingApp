import { ListingTicketRouter } from "./listing";
import { CreateTicketRouter } from "./new";
import { ShowTicketRouter } from "./show";
import { UpdateTicketRouter } from "./update";

export const routes = [
  CreateTicketRouter,
  ShowTicketRouter,
  ListingTicketRouter,
  UpdateTicketRouter,
];
