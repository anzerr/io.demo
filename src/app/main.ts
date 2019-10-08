
import {Component} from '@util/component';
import Qr from 'qr.util';
import {b32} from 'base.util';
import {Totp} from 'totp.util';

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

	getQR() {
		const o = this.state,
			qr = new Qr(`otpauth://totp/${o.name}?secret=${b32.encode(Buffer.from(this.state.totp.key), true)}&issuer=${o.from}`);
		return `data:image/svg+xml;base64,${Buffer.from(qr.toSvg()).toString('base64')}`
	}

	render(): any {
		const r = this.create;
		return r('div').c(
			r('div').style({width: '400px', margin: '100px auto'}).c(
				r('div').style({width: '200px', float: 'left'}).c(
					r('img').set({src: this.getQR()}).style({
						width: '200px',
						height: '200px'
					}).c(),
					r('div').style({textAlign: 'center'}).c('secret'),
					r('div').style({textAlign: 'center'}).c(this.state.totp.key.toString())
				),
				r('div').style({width: '200px', float: 'left'}).c(
					r('div').style({margin: '5px'}).c(
						r('input').set({value: this.state.name}).on('change', (res) => this.setState({name: res.target.value})).c(),
						r('input').set({value: this.state.secret}).on('change', (res) => {
							const totp = new Totp(res.target.value);
							this.setState({secret: res.target.value, totp: totp, key: totp.get()})
						}).c(),
						r('input').set({value: this.state.from}).on('change', (res) => this.setState({from: res.target.value})).c()
					),
					r('div').style({marginTop: '50px', textAlign: 'center'}).c(
						r('div').c('code'),
						this.state.key,
						r('div').style({display: 'inline-block', height: `${Math.floor(10 * (1 - this.state.tick))}px`, width: '10px', background: 'red'}).c()
					)
				)
			)
		);
	}

}
