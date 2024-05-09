import app from "./app.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  // "!" means required
  // For fetching data from GraphQL server, type "Query" is used
  // For changing any data on the GraphQL server, type "Mutation" is used
  // All the logic for handling data is written in the resolvers.
  const server = new ApolloServer({
    typeDefs: `
     type User {
        id: ID!,
        name: String!,
        username: String!,
        phone: String!,
        website: String!,
        company: String,
     }

     type Todo {
        id: ID!,
        userId: String!,
        title: String!,
        completed: Boolean
        owner: User
     }
     type Query {
        getTodos: [Todo]
        getUsers: [User]
        getUserById(id: ID!): User
     }
    `,
    resolvers: {
      // Resolver for fetching User from Todos
      Todo: {
        owner: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            )
          ).data,
      },

      User: {
        company: async (user) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${user?.id}`
            )
          ).data?.company?.name,
      },

      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUserById: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });
  const port = process.env.PORT || 8000;

  await server.start();
  // Route for handling all the graphQL requests.
  app.use("/graphql", expressMiddleware(server));

  app.on("error", (error) => {
    console.log("App crashed", error);
  });
  app.listen(port, () => {
    console.log("Server is up and running at " + port);
  });
};

startServer();
