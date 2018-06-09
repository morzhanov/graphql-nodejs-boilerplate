import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {PostType, UserType} from '../types';
import {PostService} from "../../services";

export const AddPostMutation = {
  type: PostType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (value: any, attrs: typeof UserType) => {
    return await PostService.createPost(attrs);
  }
};
