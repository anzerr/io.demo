
import 'semantic-ui-css/semantic.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {app} from './src/util/component';
import {TotpPage} from './src/app/main';

window.addEventListener('load', () => {
	ReactDOM.render(React.createElement(TotpPage, null), document.getElementById('root'));
});

window.onpopstate = (event) => {
	console.log('change');
	if (event.state) {
		app.store.data = event.state;
	}
	app.route.run(window.location.pathname);
};
