import web3 from './web3';
import GerenteDeContratos from './build/GerenteDeContratos.json';

const instancia = new web3.eth.Contract(
  JSON.parse(GerenteDeContratos.interface),
  'endereço do contrato'
);

export default instancia;
