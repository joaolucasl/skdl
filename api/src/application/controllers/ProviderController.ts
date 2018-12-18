import { Controller } from "./Controller";
import { ServerRoute } from "hapi";
import { getConnection } from "typeorm";
import { DBManager } from "../../infrastructure/persistence/DBManager";
import { ProviderRepository } from "../../infrastructure/persistence/repositories/ProviderRepository";


class ProviderController implements Controller {
  connection = DBManager.getConnection()
  providerRepository = this.connection.getCustomRepository(ProviderRepository);

  getProviders: ServerRoute = {
    method: 'GET',
    path: '/providers',
    options: { auth: 'jwt' },
    handler: async (req, h) => {
      return await this.providerRepository.find()
    },
  }

  routes: ServerRoute[] = [
    this.getProviders
  ];
}

export default ProviderController;