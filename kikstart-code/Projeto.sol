pragma solidity ^0.4.17;

contract Projeto{
  struct Requisicao{
    string descricao;
    uint valor;
    address contaFornecedor;
    bool sucesso;
    uint contadorAprovacoes;
    mapping(address => bool) aprovacoes;
  }
  address public gerente;
  uint public contribuicaoMinima;
  mapping(address=>bool) public doadores;
  Requisicao[] public requisicao;

  modifier verificaGerente(){
    require(msg.sender == gerente);
    _;
  }

  function Projeto(uint valorMinimo) public{
    gerente = msg.sender;
    contribuicaoMinima = valorMinimo;
  }

  function doacao() public payable{
    require(msg.value > contribuicaoMinima);
    doadores[msg.sender]=true;
  }

  function criarPedido(string descricao, uint valor, address contaFornecedor)
    public verificaGerente {
      Requisicao memory novaRequisicao = Requisicao({
        descricao: descricao,
        valor: valor,
        contaFornecedor: contaFornecedor,
        sucesso: false,
        contadorAprovacoes:0
      });
      requisicao.push(novaRequisicao);
  }
}
