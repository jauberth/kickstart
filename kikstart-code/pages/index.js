import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import gerente from '../ethereum/gerente';
import Layout from '../components/Layout';
import { Link } from '../routes';

class IndiceProjetos extends Component {
  static async getInitialProps(){
    const projetos = await gerente.methods.listarProjetosImplementados().call();
    return { projetos };

  }

renderProjetos(){
  const items = this.props.projetos.map(address => {
    return{
      header: address,
      description: (
        <Link route={`projetos/${address}`}>
          <a>Abrir Projeto</a>
        </Link>
      ),
      fluid:true
    };
  });
  return <Card.Group items = {items} />;
}

  render(){
    return(
    <Layout>
      <div>

      <h3>Projetos Abertos</h3>

      <Link route='/projetos/novo'>
        <a>
        <Button
          floated='right'
          content='Criar Projeto'
          icon='add circle'
          primary
        />
        </a>
      </Link>

          {this.renderProjetos()}
      </div>
    </Layout>
  );
  }
}

export default IndiceProjetos;
