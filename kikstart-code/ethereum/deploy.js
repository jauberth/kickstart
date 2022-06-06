const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const gerenteCompilado = require('./build/GerenteDeContratos.json');
require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.mnemonic,
  process.env.provider
);

// Passamos dois argumentos, as palavras mnemonicas e o link da rede infura

const web3 = new Web3(provider);
// Enviamos para o Web3 o provider

const deploy = async() =>{
  const accounts = await web3.eth.getAccounts();
  //Recuperamos as contas
  console.log('Conta usadas para o deploy ', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(gerenteCompilado.interface))
    .deploy({data: gerenteCompilado.bytecode})
    .send({gas:'1000000', from: accounts[0] });

  console.log('Contrato implementado em ', result.options.address);
};
deploy();
