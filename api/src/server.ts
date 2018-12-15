import "reflect-metadata"
import Hapi, { ServerRoute } from 'hapi';
import config from 'config';
import ProviderController from './application/controllers/ProviderController';
import { DBManager } from './infrastructure/persistence/DBManager';

async function start() {
  try {
    await DBManager.init()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  const server = new Hapi.Server({
    port: config.get('server.port'),
  })

  let routes: ServerRoute[] = []

  routes = routes.concat(
    new ProviderController().routes
  )

  server.route(routes)


  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.address)
}

start()
