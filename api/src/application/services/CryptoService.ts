import crypto from "crypto"
import config = require("config");

export class CryptoService {
    private readonly algorithm: string = config.get("server.security.algorithm")
    private readonly salt: string = config.get("server.security.salt")

    async hashPassword(password: string): Promise<string> {
        const hasher = crypto.createHmac(this.algorithm, this.salt)
        hasher.update(password)
        return hasher.digest("hex")
    }
}