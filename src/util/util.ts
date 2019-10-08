
class Util {

	upperFist(str): any {
		return (str.charAt(0).toUpperCase() + str.slice(1));
	}

	toArray(a): any {
		const out = [];
		for (const i in a) {
			out.push(a[i]);
		}
		return (out);
	}

	reverse(s): string {
		return s.split('').reverse().join('');
	}

	number(n, fixed = 1): string {
		return this.reverse(this.reverse(n.toFixed(fixed)).replace(/(\d{3})(?!$)/g, '$1,'));
	}

}

const util = new Util();
export default util;
