import { User } from "../entity/User";
import bcrypt from 'bcrypt';

export class UserCryptService {

    async criptografandoSenha(pass: string|undefined):Promise<string> {

        if (pass === undefined) {
            throw new Error("Erro ao criar senha")
        }
        
        return await bcrypt.hash(pass, 10);
        
    }
}