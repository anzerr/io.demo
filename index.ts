
import 'semantic-ui-css/semantic.min.css';
import './content/style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TotpPage} from '@demo/totp';
import {IdentPage} from '@demo/ident';

window.addEventListener('load', () => {
	const page = window.location.href.split('#')[1];
	if (page === 'totp') {
		document.title = 'Totp.util';
		return ReactDOM.render(React.createElement(TotpPage, null), document.getElementById('root'));
	}
	if (page === 'ident') {
		document.title = 'Ident.icon';
		return ReactDOM.render(React.createElement(IdentPage, null), document.getElementById('root'));
	}
});
