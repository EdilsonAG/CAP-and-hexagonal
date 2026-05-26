import { User } from "./User";
import { Permissao } from "./Permissao"


export class Perfil{
   
    private _descricao: String | undefined;
    private _permissao: Permissao | undefined;
    private _user: User | undefined;


    public get descricao(): String | undefined{
        return this._descricao;
    }
    public set descricao(value: String) {
        this._descricao = value;
    }
    public get permissao(): Permissao | undefined{
        return this._permissao;
    }
    public set permissao(value: Permissao) {
        this._permissao = value;
    }

    public get user(): User | undefined{
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
}