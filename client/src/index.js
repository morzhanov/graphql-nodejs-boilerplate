import './styles/main.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { inject, Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import RootStore from './stores/rootStore';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
const rootStore = RootStore.create();
const stores = {
    rootStore: rootStore
};
export const typedInject = inject;
render(React.createElement(AppContainer, null,
    React.createElement(Provider, { rootStore: rootStore },
        React.createElement(App, { rootStore: rootStore }))), document.getElementById('root'));
registerServiceWorker();
if (module.hot) {
    module.hot.accept('./components/app', () => {
        const NextApp = require('./components/App/index').default;
        render(React.createElement(AppContainer, null,
            React.createElement(NextApp, { rootStore: rootStore })), document.getElementById('root'));
    });
}
//# sourceMappingURL=index.js.map