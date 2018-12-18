import "reflect-metadata"
import Hapi, { ServerRoute } from 'hapi';
import config from 'config';
import ProviderController from './application/controllers/ProviderController';
import { DBManager } from './infrastructure/persistence/DBManager';
import * as jwtAuthStrategy from 'hapi-auth-jwt2';
import { AuthenticationService } from "./application/services/AuthenticationService";
import { LoginController } from "./application/controllers/LoginController";

async function start() {
  try {
    await DBManager.init()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  const server = new Hapi.Server({
    port: config.get('server.port'),
    debug: {
      log: ['error']
    }
  })

  await server.register({
    plugin: jwtAuthStrategy as Hapi.Plugin<jwtAuthStrategy.RegisterOptions>
  });

  const authService = new AuthenticationService();

  await server.auth.strategy('jwt', 'jwt', {
    key: config.get("server.jwt.secret"),
    validate: authService.validateJWT,
    verifyOptions: { algorithms: ['HS256'] }
  })


  let routes: ServerRoute[] = []

  routes = routes.concat(
    new ProviderController().routes,
    new LoginController().routes
  )

  server.route(routes)

  server.auth.default('jwt');

  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.address)
}

process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

start()
