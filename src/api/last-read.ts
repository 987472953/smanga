import {ajax, ajax_get} from './index';

/**
 * @description: 上次阅读记录
 * @return {*}
 */
const lastReadApi = {
	/**
	 * @description: 获取漫画最后阅读记录
	 * @param {number} mangaId
	 * @return {*}
	 */
	async get_latest(mangaId: number) {
		const res = await ajax_get({
			url: 'lastread/get_latest',
			params: {mangaId},
		});

		if (!res.data.success) {
			return false;
		} else {
			return res.data.data;
		}
	},

	/**
	 * @description: 更新最终阅读记录
	 * @param {number} page
	 * @param {number} chapterId
	 * @param {number} mangaId
	 * @return {*}
	 */
	add(page: number, chapterId: number, mangaId: number, finish = false) {
		ajax({
			url: 'lastread/add',
			data: {page, chapterId, mangaId, finish},
		});
	},

	/**
	 * @description: 获取最终阅读记录
	 * @param {number} page
	 * @param {number} pageSize
	 * @return {*}
	 */
	async get(page = 1, pageSize = 10) {
		const res = ajax_get({
			url: 'lastread/get',
			params: {page, pageSize},
		});

		return (await res).data.data.records;
	},
};

export default lastReadApi;
