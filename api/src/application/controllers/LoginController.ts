import { Controller } from "./Controller";
import { ServerRoute, Request } from "hapi";
import { AuthenticationService } from "../services/AuthenticationService";
import { CryptoService } from "../services/CryptoService";
import Joi from "joi"
import Boom from "boom"

export class LoginController implements Controller {
    private cryptoService = new CryptoService()
    private authenticationService = new AuthenticationService()

    authenticate: ServerRoute = {
        path: '/login/authenticate',
        method: 'POST',
        options: {
            auth: false,
            validate: {
                payload: {
                    email: Joi.string().email(),
                    password: Joi.string()
                }
            }
        },
        handler: async (req: Request, h) => {
            interface AuthPayload { email: string, password: string }

            const payload = req.payload as AuthPayload

            const hash = await this.cryptoService.hashPassword(payload.password)

            const credentials = {
                email: payload.email,
                passwordHash: hash
            }

            const areCredentialsValid = await this.authenticationService.areCredentialsValid(credentials)

            req.log(`credentials ${credentials} are valid`)

            if (areCredentialsValid) {
                const jwt = this.authenticationService.generateToken(credentials)

                return {
                    token: jwt
                }
            }

            throw Boom.unauthorized('Invalid Credentials')
        }
    }

    routes: ServerRoute[] = [
        this.authenticate
    ];
}