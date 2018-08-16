const { GraphQLObjectType, GraphQLString } = require("graphql");

export const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

export const RegisterType = new GraphQLObjectType({
  name: "Register",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

export const AuthResponseType = new GraphQLObjectType({
  name: "AuthResponse",
  fields: () => ({
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString }
  })
});
