import { User } from "../../../domain/user/entity/User";

export interface UserPersistencePort {
    create(user: User): Promise<String | undefined>;
    findById(id: Number): Promise<User | undefined>
}