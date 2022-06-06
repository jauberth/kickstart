import web3 from './web3';
import GerenteDeContratos from './build/GerenteDeContratos.json';

const instancia = new web3.eth.Contract(
  JSON.parse(GerenteDeContratos.interface),
  '0xc9910b1d2CEdC56faEa6316e555642d4A18f1037'
);

export default instancia;
