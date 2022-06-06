import web3 from './web3';
import Projeto from './build/Projeto.json'

export default address =>{
  return new web3.eth.Contract(
    JSON.parse(Projeto.interface),
    address
  );
};
