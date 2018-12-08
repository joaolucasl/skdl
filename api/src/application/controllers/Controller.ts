import { ServerRoute } from "hapi";

export interface Controller {
    routes: ServerRoute[]
}
