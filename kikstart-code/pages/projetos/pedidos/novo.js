import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Projeto from '../../../ethereum/projeto';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';


class NovoPedido extends Component{
  state={
    valor:'',
    descricao:'',
    fornecedor:'',
    loading: false,
    errorMessage:''
  }
  static async getInitialProps(props){
      const { address } = props.query;

      return { address };
  }

  onSubmit = async event =>{
    event.preventDefault();
    const projeto = Projeto(this.props.address);
    const {descricao, valor, fornecedor} = this.state;

    this.setState({loading: true, errorMessage:''});

  try {
    const conta = await web3.eth.getAccounts();
    await projeto.methods
    .criarPedido(
      descricao,
      web3.utils.toWei(valor, 'ether'),
      fornecedor)
      .send({ from: conta[0] })

      Router.pushRoute(`/projetos/${this.props.address}/pedidos`);

  } catch (err) {
      this.setState({errorMessage: err.message});
  }
  this.setState({loading: false});
};

  render() {
    return (
      <Layout>
        <Link route={`/projetos/${this.props.address}/pedidos`}>
        <a>
          <Button primary> Voltar aos pedidos</Button>
        </a>
        </Link>
        <h3>Crie um Pedido</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Descrição</label>
            <Input
              value={this.state.descricao}
              onChange={event => this.setState({descricao: event.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Valor em Ether</label>
            <Input value={this.state.valor}
            onChange={event => this.setState({valor: event.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Fornecedor</label>
            <Input value={this.state.fornecedor}
            onChange={event => this.setState({fornecedor: event.target.value})}/>
          </Form.Field>
          <Message error header='Oooopss!' content={this.state.errorMessage}/>
          <Button primary loading={this.state.loading}> Criar!</Button>
        </Form>
      </Layout>
    );
  }
}

export default NovoPedido;
