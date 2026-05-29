import { User } from "../../../domain/user/entity/User";

export interface UserPersistencePort {
    create(user: User): Promise<String | undefined>;
    findById(id: string): Promise<User | undefined>
    findByEmail(email: String): Promise<User | undefined>
}