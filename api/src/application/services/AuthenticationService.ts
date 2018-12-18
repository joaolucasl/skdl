import { LoginRepository } from "../../infrastructure/persistence/repositories/LoginRepository"
import { DBManager } from "../../infrastructure/persistence/DBManager"
import { Request } from "hapi"
import { isEmpty } from "ramda"
import jwt from "jsonwebtoken"
import config from "config";
import { CryptoService } from "./CryptoService";

type RawCredentials = { email: string, password: string };
type HashedCredentials = { email: string, passwordHash: string };

export class AuthenticationService {
    connection = DBManager.getConnection();

    loginRepository: LoginRepository = this.connection.getCustomRepository(LoginRepository)

    private readonly cryptoService = new CryptoService();

    async validateJWT(decoded: RawCredentials, request: Request) {
        const hashedCredentials: HashedCredentials = {
            email: decoded.email,
            passwordHash: await this.cryptoService.hashPassword(decoded.password)
        }

        const isValid = await this.areCredentialsValid(hashedCredentials)

        return {
            isValid
        }
    }

    generateToken(credentials: HashedCredentials) {
        return jwt.sign(credentials, config.get("server.jwt.secret"))
    }

    async areCredentialsValid(credentials: HashedCredentials) {
        const foundAccounts = await this.loginRepository.find({
            where: {
                email: credentials.email,
                passwordHash: credentials.passwordHash
            }
        })

        return !isEmpty(foundAccounts)
    }
}