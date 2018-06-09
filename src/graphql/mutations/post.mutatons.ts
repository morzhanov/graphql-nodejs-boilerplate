import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import {PostType, UserType} from '../types';
import {PostService} from "../../services";

export const AddPostMutation = {
  type: PostType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLInt)},
    url: {type: new GraphQLNonNull(GraphQLString)},
    likes: {type: new GraphQLNonNull(GraphQLInt)},
    owner: {type: new GraphQLNonNull(GraphQLInt)}
  },
  resolve: async (value: any, attrs: typeof UserType) => {
    return await PostService.createPost(attrs);
  }
};
