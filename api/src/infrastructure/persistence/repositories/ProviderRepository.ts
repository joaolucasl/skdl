import { EntityRepository, Repository } from "typeorm";
import Provider from "../../../domain/model/Provider";

@EntityRepository(Provider)
export class ProviderRepository extends Repository<Provider> {
}