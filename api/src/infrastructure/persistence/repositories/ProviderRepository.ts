import { EntityRepository, Repository } from "typeorm";
import Provider from "../../../domain/model/Login";

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {
}