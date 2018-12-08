import Hapi, { ServerRoute } from 'hapi';
import config from 'config';
import "reflect-metadata"
import ProviderController from './application/controllers/ProviderController';

const server = new Hapi.Server({
  port: config.get('server.port'),
})

const routes: ServerRoute[] = []

routes.concat(ProviderController.routes)

routes.forEach(r => server.route(r))

async function start() {
  try {
    await server.start()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  console.log('Server running at:', server.info.address)
}

start()
