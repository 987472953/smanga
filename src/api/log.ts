/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-06-13 21:23:19
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-06-13 21:24:39
 * @FilePath: \smanga\src\api\log.ts
 */
import {ajax, ajax_get} from './index';

const logApi = {
	async get_log(page: number, pageSize = 10) {
		const res = ajax_get({
			url: 'log/get',
			params: {page, pageSize},
		});
		return (await res).data;
	},
};

export default logApi;
