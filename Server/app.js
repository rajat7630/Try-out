const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const authenticationRouter = require('./routes/authenticationRouter');

const pubnub = require('./pubnubServer');

const app = express();
app.use(cors());
app.use(bodyParser());

const indexRouter = require('./routes/index');
const clientLogin = require('./routes/client_routes.js');

app.post(
  '/pubnubadmin',
  (req, res) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    res.send(pubnub.grantPermissionForAdmin(req.body.id, req.body.ttl))
  // eslint-disable-next-line function-paren-newline
);

app.post(
  '/pubnubuser',
  (req, res) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    // eslint-disable-next-line comma-dangle
    // eslint-disable-next-line implicit-arrow-linebreak
    res.send(pubnub.grantPermissionForUser(req.body.id, req.body.ttl))
  // eslint-disable-next-line function-paren-newline
);

app.use('/', indexRouter);
app.use('/test', clientLogin);

app.get('/', (req, res) => {
  res.send('server started');
});

const typeDefs = require('./schema.js');
const resolvers = require('./resolver.js');

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
