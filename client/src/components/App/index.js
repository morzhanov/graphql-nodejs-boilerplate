import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
// import {typedInject} from "../index";
const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
`;
// todo change to inject
const Index = ({ rootStore }) => 
// const Index = ({ rootStore }: {rootStore: typeof RootStore.Type}) =>
React.createElement(Wrapper, null, "MST React Boilerplate");
export default observer(Index);
//# sourceMappingURL=index.js.map