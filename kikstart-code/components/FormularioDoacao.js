import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Projeto from '../ethereum/projeto';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class FormularioDoacao extends Component{
  state={
    value:''
  };

onSubmit = async event => {
  event.preventDefault();
  const projeto = Projeto(this.props.address);

  this.setState({ loading: true, errorMessage: '' });


  try {
    const contas = await web3.eth.getAccounts();
    await projeto.methods.doacao().send({
      from: contas[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    Router.replaceRoute(`/projetos/${this.props.address}`)
  } catch (err) {
    this.setState({ errorMessage: err.message});
  }

  this.setState({ loading: false, value: ''});
};


  render(){
    return(
      <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
      <Form.Field>
        <label>Valor de Doação</label>
        <Input
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value})}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header='Ooops!' content={this.state.errorMessage} />
      <Button primary loading={this.state.loading}>
      Fazer Doação!
      </Button>
      </Form>
    );
  }
}

export default FormularioDoacao;
