import Hapi, { ServerRoute } from 'hapi';
import config from 'config';
import providerController from './application/controllers/provider.controller';

const server = new Hapi.Server({
  port: config.get('server.port'),
})

const routes: ServerRoute[] = []

routes.concat(providerController.routes)

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
