
import 'semantic-ui-css/semantic.min.css';
import './content/style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {app} from './src/util/component';
import {TotpPage} from '@demo/totp';

window.addEventListener('load', () => {
	let page = window.location.href.split('#')[1];
	if (page === 'totp') {
		document.title = 'Totp.util';
		ReactDOM.render(React.createElement(TotpPage, null), document.getElementById('root'));
	}
});
