
import {Component} from '@util/component';
import {Remarkable} from 'remarkable';
import * as hljs from 'highlight.js/lib/highlight';
import * as javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);

const md = new Remarkable({
	html: true,

	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (err) {
				// nothing
			}
		}

		try {
			return hljs.highlightAuto(str).value;
		} catch (err) {
			// nothing
		}

		return '';
	}
});

export class Markdown extends Component {

	constructor(props) {
		super(props);
	}

	render(): any {
		const r = this.create;
		return r('div').style(this.props.style).set({
			dangerouslySetInnerHTML: {__html: md.render(this.props.md)}
		}).c();
	}

}
