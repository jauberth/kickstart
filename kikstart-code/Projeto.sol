pragma solidity ^0.8.4;

contract GerenteDeContratos{
    Projeto[] public projetosImplementados;
    
    function criaProjeto(uint valorMinimo) public{
        Projeto novoProjeto = new Projeto(valorMinimo, msg.sender);
        projetosImplementados.push(novoProjeto);
    }

    function listarProjetosImplementados() public view returns (Projeto[] memory){
        return projetosImplementados;
    }
}

contract Projeto{
  struct Pedido{
    string descricao;
    uint valor;
    address payable contaFornecedor;
    bool sucesso;
    uint contadorAprovacoes;
    mapping(address => bool) aprovacoes;
  }
  uint numPedidos;
  mapping(uint => Pedido) public pedidos;

  address public gerente;
  uint public contribuicaoMinima;
  uint public contadorDeDoadores;
  mapping(address=>bool) public doadores;

  constructor(uint valorMinimo, address criador){
    gerente = criador;
    contribuicaoMinima = valorMinimo;
  }

  modifier verificaGerente(){
    require(msg.sender == gerente);
    _;
  }

  function doacao() public payable{
    require(msg.value > contribuicaoMinima);
    doadores[msg.sender]=true;
    contadorDeDoadores++;
  }

  function criarPedido(string memory descricao, uint valor, address payable contaFornecedor) public verificaGerente {
      Pedido storage p = pedidos[numPedidos++];
      p.descricao = descricao;
      p.valor = valor;
      p.contaFornecedor = contaFornecedor;
      p.sucesso = false;
      p.contadorAprovacoes = 0;
  }

  function aprovarRequisicao(uint index) public{
    Pedido storage pedido = pedidos[index];
    require(doadores[msg.sender]);
    require(!pedido.aprovacoes[msg.sender]);

    pedido.aprovacoes[msg.sender] = true;
    pedido.contadorAprovacoes++;

  }

  function finalizePedido(uint index) public verificaGerente{
      Pedido storage pedido = pedidos[index];

      require(pedido.contadorAprovacoes > (contadorDeDoadores / 2));
      require(!pedido.sucesso);

      pedido.contaFornecedor.transfer(pedido.valor);
      pedido.sucesso = true;
  }

  function resumo() public view returns (uint, uint, uint, uint, address){
    return(
      contribuicaoMinima,
      numPedidos,
      address(this).balance,
      contadorDeDoadores,
      gerente
    );
  }

  function contadorDePedidos() public view returns (uint){
    return numPedidos;
  }
}
