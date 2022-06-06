import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Projeto from '../../ethereum/projeto';
import web3 from '../../ethereum/web3';
import FormularioDoacao from '../../components/FormularioDoacao';
import { Link } from '../../routes';

class ExibeProjetos extends Component{

  static async getInitialProps(props) {
    const projeto = Projeto(props.query.address);
    const resumo = await projeto.methods.resumo().call();
    return{
      address: props.query.address,
      contribuicaoMinima: resumo[0],
      numeroDePedidos: resumo[1],
      saldo: resumo[2],
      aprovadores: resumo[3],
      gerente: resumo[4]
    };
  }

  renderCards(){
    const {
      numeroDePedidos,
      gerente,
      contribuicaoMinima,
      saldo,
      aprovadores
    } = this.props;

    const items = [
      {
        header: gerente,
        meta: 'Endereço do Gerente',
        description: 'Este projeto foi criado por este Gerente e ele pode criar solicitações de despesas',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: contribuicaoMinima,
        meta: 'Valor Mínimo de Contribuição (wei)',
        description: 'Valor mínimo de cotribuição para se tornar um aprovador'
      },
      {
        header: numeroDePedidos,
        meta: 'Número dos Pedidos de compras',
        description: 'Número dos pedidos de compra aguardando aprovação'
      },
      {
        header: aprovadores,
        meta: 'Número de aprovadores de despesas',
        description: 'Número de pessoas que podem aprovar despesas solicitadas pelo gerente'
      },
      {
        header: web3.utils.fromWei(saldo, 'ether'),
        meta: 'Saldo do Projeto (Ether)',
        description: 'Quantidade de ether que o projeto ainda tem para ser usado'
      }
    ];
    return <Card.Group items={items} />;
  }

  render(){
    return(
      <Layout>
        <h3> Dados do Projeto</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <FormularioDoacao address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/projetos/${this.props.address}/pedidos`}>
              <a>
                <Button primary>Lista de Pedidos</Button>
              </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ExibeProjetos;
