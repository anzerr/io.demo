
import {Component} from '@util/component';
import QrHandle from 'qr.util';

export class Qr extends Component {

	constructor(props) {
		super(props);
	}

	render(): any {
		const r = this.create;
		return r('img').style(this.props.style).set({
			src: `data:image/svg+xml;base64,${Buffer.from((new QrHandle(this.props.data)).toSvg()).toString('base64')}`
		}).c();
	}

}
