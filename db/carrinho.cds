
namespace app;
using { cuid, managed } from '@sap/cds/common';
using { app.User } from './user';

entity Carrinho {
    key id          : UUID;
        user        : Association to one User;
        // para arrays é melhor usar composition, e também por conta do ciclo de vida em cascata
        itens       : Composition of many ItemCarrinho on itens.carrinho = $self;
}
