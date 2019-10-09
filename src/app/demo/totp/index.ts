
import {Component} from '@util/component';
import style from '@util/style';
import {Grid, Segment, Header, Input, Label, Form, Progress, Icon} from 'semantic-ui-react'
import {Qr} from '@part/qr';
import {Markdown} from '@part/markdown';
import {Center} from '@part/center';
import {b32} from 'base.util';
import {Totp} from 'totp.util';
import doc from './doc';

export class TotpPage extends Component {

	constructor(props) {
		super(props);
		const secret = '1234567890';
		this.state = {
			name: 'cat',
			secret: secret,
			from: 'from',
			totp: new Totp(secret)
		};
	}

	componentDidMount(): any {
		this.setState({time: setInterval(() => {
			let a = (new Date().getTime()) / 30000, b = a - Math.floor(a);
			this.setState({tick: b, key: this.state.totp.get()})
		}, 100)});
	}

	componentWillUnmount(): any {
		clearInterval(this.state.time);
	}

	data() {
		const o = this.state;
		return `otpauth://totp/${o.name}?secret=${b32.encode(Buffer.from(this.state.totp.key), true)}&issuer=${o.from}`
	}

	render(): any {
		const r = this.create, code = [];
		const codeKey = this.state.key || '';
		for (let i = 0; i < 6; i++) {
			code.push(r(Label).set({key: i}).c(codeKey[i]));
		}

		return r('div').style({width: '800px', margin: '0 auto'}).c(
			r(Header).style({marginTop: '50px'}).c(
				'Totp.util',
				r(Header.Subheader).c('Totp util base on rfc6238 for two step authentication')
			),
			r(Markdown).set({md: doc}).c(),
			r('div').style({textAlign: 'center', margin: '10px'}).c(
				r(Label).c(this.data())
			),
			r(Grid).set({columns: 2, divided: true}).c(
				r(Grid.Row).set({stretched: true}).c(
					r(Grid.Column).c(
						r(Segment).c(
							r(Center).c(
								r(Qr).set({data: this.data()}).style({width: '200px', height: '200px'}).c(),
								r(Label).style({margin: '10px'}).c(this.state.totp.key.toString())
							)
						)
					),
					r(Grid.Column).c(
						r(Segment).c(
							r(Form).c(
								r(Form.Field).c(
									r(Input).set({
										value: this.state.name,
										fluid: true,
										label: {basic: true, content: 'name'},
										labelPosition: 'left',
										placeholder: 'name'
									}).on('change', (res) => this.setState({name: res.target.value})).c()
								),
								r(Form.Field).c(
									r(Input).set({
										value: this.state.secret,
										fluid: true,
										label: {basic: true, content: 'secret'},
										labelPosition: 'left',
										placeholder: 'secret'
									}).on('change', (res) => {
										const totp = new Totp(res.target.value);
										this.setState({secret: res.target.value, totp: totp, key: totp.get()})
									}).c()
								),
								r(Form.Field).c(
									r(Input).set({
										value: this.state.from,
										fluid: true,
										label: {basic: true, content: 'from'},
										labelPosition: 'left',
										placeholder: 'from'
									}).on('change', (res) => this.setState({from: res.target.value})).c()
								)
							)
						),
						r(Segment).style({textAlign: 'center'}).c(
							r(Header).set({as: 'h2'}).c('Current code'),
							r('div').style({margin: '10px'}).c(code),
							r(Progress).set({percent: Math.floor(100 * (1 - this.state.tick)), size: 'tiny', color: 'blue', active: true}).c()
						)
					)
				)
			),
			r(Grid).set({columns: 2}).c(
				r(Grid.Row).set({stretched: true}).c(
					r(Grid.Column).style({textAlign: 'center'}).c(
						r('a').style(style.click).set({href: 'https://github.com/anzerr/io.demo/blob/master/src/app/demo/totp.ts'}).c(
							r(Icon).set({name: 'github'}).c(),
							'Page source code'
						)
					),
					r(Grid.Column).style({textAlign: 'center'}).c(
						r('a').style(style.click).set({href: 'https://github.com/anzerr/totp.util'}).c(
							r(Icon).set({name: 'github'}).c(),
							'totp.util'
						)
					)
				)
			)
		);
	}

}
