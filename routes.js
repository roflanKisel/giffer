const routes = require('next-routes');

module.exports = routes().add('gifpage', '/gif/:id', 'gifpage');
