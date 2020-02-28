const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config({path: 'variables.env'});
const bodyParser = require("body-parser");
const Recipe = require("./models/Recipe");
const User = require("./models/User");

// Bring in GraphQl middleware
const { graphiqlExpress, graphqlExpress} = require("apollo-server-express")
const { makeExecutableSchema } = require("graphql-tools")

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

//Create GraphQl Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//Connect to the database
mongoose
    .connect(process.env.MONGO_URI, { autoIndex: false})
    .then(() => console.log("DB Connected"))
    .catch(err => console.error(err));

//Initializes application
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));

//Create GraphiQl application
app.use(
    '/graphiql',
    graphiqlExpress({ endpointURL: '/graphql'}
));

// Connect schemas with Graphql
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
