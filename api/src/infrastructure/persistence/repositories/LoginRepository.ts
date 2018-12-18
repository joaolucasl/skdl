import { EntityRepository, Repository } from "typeorm";
import Login from "../../../domain/model/Login";

@EntityRepository(Login)
export class LoginRepository extends Repository<Login> {
}