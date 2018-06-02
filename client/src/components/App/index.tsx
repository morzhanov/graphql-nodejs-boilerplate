import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import RootStore from '../../stores/rootStore'
// import {typedInject} from "../index";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
`;
// todo change to inject
const Index = ({ rootStore }: {rootStore: typeof RootStore.Type}) =>
// const Index = ({ rootStore }: {rootStore: typeof RootStore.Type}) =>
  <Wrapper>
    MST React Boilerplate
  </Wrapper>;

export default observer(Index)
