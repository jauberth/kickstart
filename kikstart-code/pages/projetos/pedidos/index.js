import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Projeto from '../../../ethereum/projeto';
import MontaLinha from '../../../components/MontaLinha';


class ListaPedidos extends Component{
  static async getInitialProps(props) {
      const { address } = props.query;

      const projeto = Projeto(address);
      const contadorDePedidos =  await projeto.methods.contadorDePedidos().call();
      const contadorDeDoadores = await projeto.methods.contadorDeDoadores().call();
      const pedidos = await Promise.all(
        Array(parseInt(contadorDePedidos)).fill().map((element,index) => {
          return projeto.methods.pedidos(index).call()
        })
      );

      return { address, pedidos, contadorDePedidos, contadorDeDoadores };
  }

  renderRow(){
    return this.props.pedidos.map((pedido, index) => {
      return (<MontaLinha
        key={index}
        id={index}
        pedido={pedido}
        address={this.props.address}
        contadorDeDoadores={this.props.contadorDeDoadores}
        />
      );
    });
  }

  render(){
    const { Header, Row, HeaderCell, Body } = Table;

    return(
      <Layout>
        <h3>Lista de Pedidos de Despesa</h3>
        <Link route={`/projetos/${this.props.address}/pedidos/novo`}>
          <a>
            <Button primary floated='right' style={{marginBottom: 10}}>
              Adicione um Pedido
            </Button>
          </a>
        </Link>
        <Table>
         <Header>
           <Row>
             <HeaderCell>Id</HeaderCell>
             <HeaderCell>Descrição</HeaderCell>
             <HeaderCell>Valor</HeaderCell>
             <HeaderCell>Fornecedor</HeaderCell>
             <HeaderCell>Num. Aprovações</HeaderCell>
             <HeaderCell>Aprovar</HeaderCell>
             <HeaderCell>Finalizar</HeaderCell>
            </Row>
           </Header>
           <Body>
            {this.renderRow()}
           </Body>
         </Table>
         <div>
          Existem {this.props.contadorDePedidos} pedidos.
         </div>
      </Layout>
    );
  }
}

export default ListaPedidos;
