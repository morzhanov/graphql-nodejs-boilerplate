import { types } from 'mobx-state-tree'

export const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string)
  });

const RootStore = types
  .model('RootStore', {
    user: types.optional(types.maybe(UserModel), null)
  });

export default RootStore
