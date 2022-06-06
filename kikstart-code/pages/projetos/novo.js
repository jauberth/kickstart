import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import gerente from '../../ethereum/gerente';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class NovoProjeto extends Component {
  state={
    contribuicaoMinima:'',
    errorMessage:'',
    loading: false
  };

  onSubmit = async (event) =>{
    event.preventDefault();
    this.setState({ loading: true, errorMessage:''});
    try{
      const contas = await web3.eth.getAccounts();
      await gerente.methods.criaProjeto(this.state.contribuicaoMinima).send({
        from: contas[0]
      });
    Router.pushRoute('/')
  }catch (err){
    this.setState({errorMessage: err.message});
  }
    this.setState({ loading: false});
};

  render(){
    return (
      <Layout>
      <h3>Criar um novo Projeto</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Contribuição Mínima</label>
          <Input
            label="wei" labelPosition="right"
            value={this.state.contribuicaoMinima}
            onChange={event=>
              this.setState({contribuicaoMinima: event.target.value})}
            />
        </Form.Field>
        <Message error header='Oooopa!' content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Criar!</Button>
      </Form>
      </Layout>
    );
  }
}

export default NovoProjeto;
