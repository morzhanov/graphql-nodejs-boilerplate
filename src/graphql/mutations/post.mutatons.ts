import {Post, User} from "../../entities/index";
import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {PostType, UserType} from '../types/index';
import {db} from "../../db/index";

const ResponseType = new GraphQLObjectType({
  name: 'ResponseType',
  fields: {
    status: {
      type: GraphQLString
    },
    error: {
      type: GraphQLString
    }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await db.connection.manager.getRepository(User).find();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve() {
        return await db.connection.manager.getRepository(Post).find();
      }
    }
  }
});

const RootMutationsType = new GraphQLObjectType({
  name: 'RootMutationsType',
  fields: {
    addUser: {
      type: ResponseType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(value, attrs: {id: number, email: string, password: string}) {
        const user = User.create(attrs);
        try {
          const res = await db.connection.manager
            .getRepository(User)
            .insert(user);
          return {
            status: 'Success'
          }
        } catch (e) {
          return {
            status: 'Failure',
            error: e.detail
          }
        }
      }
    },
    addPost: {
      type: ResponseType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        url: {type: new GraphQLNonNull(GraphQLString)},
        likes: {type: new GraphQLNonNull(GraphQLInt)},
        owner: {type: new GraphQLNonNull(GraphQLInt)}
      },
      async resolve(value, attrs: {id: number, url: string, likes: number, owner: number}) {
        const post = Post.create(attrs);
        try {
          const res = await db.connection.manager
            .getRepository(Post)
            .insert(post);
          return {
            status: 'Success'
          }
        } catch (e) {
          return {
            status: 'Failure',
            error: e.detail
          }
        }
      }
    }
  }
});

export const RootQuery = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationsType
});
