import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Projeto from '../ethereum/projeto';

class MontaLinha extends Component{
  onAprovar = async () =>{
      const projeto = Projeto(this.props.address);

      const contas = await web3.eth.getAccounts();
      await projeto.methods.aprovarRequisicao(this.props.id).send({
        from: contas[0]
      });
  };

  onFinalizar = async () =>{
    const projeto = Projeto(this.props.address);

    const contas = await web3.eth.getAccounts();
    await projeto.methods.finalizePedido(this.props.id).send({
      from: contas[0]
    });
  };

  render() {
    const { Row, Cell } =  Table;
    const { id, pedido, contadorDeDoadores } = this.props;
    const prontoParaFinalizar = pedido.contadorAprovacoes > contadorDeDoadores / 2;
    return(
      <Row disabled={pedido.sucesso} positive={prontoParaFinalizar && !pedido.sucesso}>
        <Cell>{id}</Cell>
        <Cell>{pedido.descricao}</Cell>
        <Cell>{web3.utils.fromWei(pedido.valor, 'ether')}</Cell>
        <Cell>{pedido.contaFornecedor}</Cell>
        <Cell>
        {pedido.contadorAprovacoes}/{contadorDeDoadores}
        </Cell>
        <Cell>
        {pedido.sucesso ? null : (
            <Button color='green' basic onClick={this.onAprovar}>
              Aprovar
            </Button>
        )}
        </Cell>
        <Cell>
        {pedido.sucesso ? null : (
          <Button color='red' basic onClick={this.onFinalizar}>
            Finalizar
          </Button>
        )}
        </Cell>
      </Row>
    );
  }
}


export default MontaLinha;
