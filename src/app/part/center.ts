
import {Component} from '@util/component';

export class Center extends Component {

	constructor(props) {
		super(props);
	}

	render(): any {
		const r = this.create;
		return r('div').style({display: 'table', height: '100%', width: '100%', textAlign: 'center'}).c(
			r('span').style({display: 'table-cell', verticalAlign: 'middle'}).c(
				this.props.children
			)
		);
	}

}
