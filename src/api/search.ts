/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-04-04 00:30:31
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-08-25 15:08:56
 * @FilePath: \smanga\src\api\search.ts
 */
import {ajax, ajax_get} from './index';

export function search(
	searchText: string,
	searchType: string,
	page: number,
	pageSize: number,
	order = ''
) {
	return ajax_get({
		url: 'search/get',
		params: {searchText, searchType, page, pageSize, order},
	});
}

const searchApi = {
	async get(
		searchText: string,
		searchType: string,
		page: number,
		pageSize: number,
		order = ''
	) {
		const res =  ajax_get({
			url: 'search/get',
			params: {searchText, searchType, page, pageSize, order},
		});

		return (await res).data.data;
	},
};

export default searchApi;
