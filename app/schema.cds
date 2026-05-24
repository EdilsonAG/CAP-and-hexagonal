using { managed } from '@sap/cds/common';

namespace app;

entity Product : managed {
  key  id: Integer;
  descricaoProduto: String not null;
  nomeProduto: String;
 }