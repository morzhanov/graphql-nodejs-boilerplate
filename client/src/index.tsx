import './styles/main.scss'
import * as React from 'react'
import { render } from 'react-dom'
import {inject, Provider} from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import RootStore from './stores/rootStore'
import App from './components/App'
import { TypedInject } from "./utils/types";
import registerServiceWorker from './registerServiceWorker'

const rootStore = RootStore.create();

const stores = {
  rootStore: rootStore
};

export const typedInject = inject as TypedInject<typeof stores>;

render(
  <AppContainer>
    <Provider rootStore={rootStore}>
      <App rootStore={rootStore}/>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/App/index').default;

    render(<AppContainer>
        <NextApp rootStore={rootStore}/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
