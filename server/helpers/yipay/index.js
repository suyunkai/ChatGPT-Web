"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const utils_1 = require("../../utils");
async function precreate(base, config, options) {
	const data = (0, utils_1.filterObjectNull)({
		device: 'pc',
		...config,
		...options
	});
	console.log(data);
	const sortedData = (0, utils_1.ksort)(data);
	const query = (0, utils_1.buildQueryString)(sortedData);
	console.log('query---', query)
	const sign = (0, utils_1.generatePayMd5)(query + base.key);
	const formBody = querystring_1.default.stringify({
		sign,
		sign_type: 'MD5',
		...data
	});
	let api = '';
	let response;
	let json;
	console.log('api formBody', formBody)
	if(base.api === 'https://pay.bluetuo.com/'){
		api = base.api + '/mapi.php';
		response = await (0, node_fetch_1.default)(api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			body: formBody
		});
		json = await response.json();
		console.log('拓普易支付返回结构', json);
	}else if(base.api === 'https://fzpay.vip/'){
		api = base.api + '/submit.php';
		response = await (0, node_fetch_1.default)(`${api}?${formBody}`, {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			}
		  });
		json = response;
	}

	return {
		code: json.code === 1 ? 0 : json.code,
		pay_url: json.payurl || json.qrcode || json.urlscheme
	};
}
async function checkNotifySign(params, key) {
	const sign = params.sign;
	const data = (0, utils_1.filterObjectNull)({
		...params,
		channel: null,
		sign: null,
		sign_type: null
	});
	const sortedData = (0, utils_1.ksort)(data);
	const query = (0, utils_1.buildQueryString)(sortedData);
	const newSign = (0, utils_1.generatePayMd5)(query + key);
	return sign === newSign;
}
exports.default = {
	precreate,
	checkNotifySign
};
//# sourceMappingURL=index.js.map
