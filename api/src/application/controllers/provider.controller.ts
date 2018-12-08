import { Controller } from "./controller";
import { ServerRoute } from "hapi";

const getProviders: ServerRoute = {
  method: 'GET',
  path: '/providers',
  handler: (req, h) => ({
    providers: [
      {
        name: 'Joaquim Jose',
        slots: [
          {
            start: '',
            end: '',
          },
        ],
      },
    ],
  }),
}


const ProviderController: Controller = {
  routes: [
    getProviders
  ]
}

export default ProviderController;