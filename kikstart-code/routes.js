const routes = require('next-routes')();

routes
  .add('/projetos/novo', '/projetos/novo')
  .add('/projetos/:address', '/projetos/show')
  .add('/projetos/:address/pedidos', 'projetos/pedidos/index')
  .add('/projetos/:address/pedidos/novo', 'projetos/pedidos/novo');

module.exports = routes;
