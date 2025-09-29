import { DeleteOrderRouter } from "./delete";
import { ListingOrderRouter } from "./listing";
import { CreateOrderRouter } from "./new";
import { ShowOrderRouter } from "./show";

export const routes = [
  CreateOrderRouter,
  ShowOrderRouter,
  ListingOrderRouter,
  DeleteOrderRouter,
];
