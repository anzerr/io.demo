
import {Component} from '@util/component';
import style from '@util/style';
import {Grid, Segment, Header, Input, Form, Message, Icon, Button} from 'semantic-ui-react';
import {Markdown} from '@part/markdown';
import {Center} from '@part/center';
import key from 'unique.util';
import Identicon from 'ident.icon';
import doc from './doc';

const placeholder = {display: 'inline-block', width: '200px', height: '200px', background: 'rgb(240, 240, 240)'};

export class IdentPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 'e3d7bb56cd6a33ed',
			images: [],
			i: 0
		};
		for (let i = 0; i < 33; i++) {
			this.state.images.push(this.ident());
		}
	}

	componentDidMount(): any {
		this.setState({time: setInterval(() => {
			const i = (this.state.i + 1) % this.state.images.length;
			this.state.images[i] = this.ident();
			this.setState({i: i, images: this.state.images});
		}, 200)});
	}

	componentWillUnmount(): any {
		super.componentWillUnmount();
		clearInterval(this.state.time);
	}

	ident(s?: string): string {
		return new Identicon(s || key.random({char: '0123456789abcdef'})).toString();
	}

	render(): any {
		const r = this.create, image = [];
		for (const i in this.state.images) {
			image.push(r('img').style({margin: '2px'}).set({
				key: i,
				src: `data:image/svg+xml;base64,${this.state.images[i]}`
			}).c());
		}

		let error = null;
		if (this.state.value.length < 15) {
			error = {header: 'Invalid input', content: 'needs more then 15 char'};
		}
		if (!this.state.value || !this.state.value.match(/^[0-9a-f]+$/)) {
			error = {header: 'Invalid input', content: 'use hex values [0-9a-f]'};
		}

		return r('div').style({width: '800px', margin: '0 auto'}).c(
			r(Header).style({marginTop: '50px'}).c(
				'Ident.icon',
				r(Header.Subheader).c('github style identicon util')
			),
			r('div').style({width: '100%'}).c(image),
			r(Markdown).set({md: doc}).c(),
			r(Grid).set({columns: 2, divided: true}).c(
				r(Grid.Row).set({stretched: true}).c(
					r(Grid.Column).c(
						r(Segment).c(
							r(Center).c(
								(error) ? r('div').style(placeholder).c() : r('img').style({margin: '2px', width: '200px'}).set({
									src: `data:image/svg+xml;base64,${this.ident(this.state.value)}`
								}).c()
							)
						)
					),
					r(Grid.Column).c(
						r(Segment).c(
							r(Form.Field).c(
								r(Center).c(
									(error) ? r(Message).set({error: true, ...error}).c() : null,
									r(Input).set({
										value: this.state.value,
										fluid: true,
										label: {basic: true, content: 'value'},
										labelPosition: 'left',
										placeholder: 'value'
									}).on('change', (res) => this.setState({value: res.target.value})).c(),
									r(Button).on('click', () => {
										this.setState({value: key.random({char: '0123456789abcdef'})});
									}).c('Random')
								)
							)
						)
					)
				)
			),
			r(Grid).set({columns: 2}).c(
				r(Grid.Row).set({stretched: true}).c(
					r(Grid.Column).style({textAlign: 'center'}).c(
						r('a').style(style.click).set({href: 'https://github.com/anzerr/io.demo/blob/master/src/app/demo/ident/index.ts'}).c(
							r(Icon).set({name: 'github'}).c(),
							'Page source code'
						)
					),
					r(Grid.Column).style({textAlign: 'center'}).c(
						r('a').style(style.click).set({href: 'https://github.com/anzerr/ident.icon'}).c(
							r(Icon).set({name: 'github'}).c(),
							'totp.util'
						)
					)
				)
			)
		);
	}

}
