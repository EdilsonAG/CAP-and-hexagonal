

namespace app;
using { cuid, managed } from '@sap/cds/common';
using { app.Carrinho } from './Carrinho'
using { app.Product } from './product';


entity ItemCarrinho {
    key id          : UUID;
        carrinho    : Association to one Carrinho;
        produto     : Association to one Product;
        quantidade  : Integer;
}