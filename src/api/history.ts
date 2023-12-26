/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-03-17 20:18:30
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-10-25 02:01:31
 * @FilePath: \smanga\src\api\history.ts
 */
import {ajax, ajax_get} from './index';
import {global_get} from '@/utils';

/**
 * @description: 历史记录接口
 * @return {*}
 */
const historyApi = {
	/**
	 * @description: 获取漫画最后阅读记录
	 * @param {number} mangaId
	 * @return {*}
	 */
	async get_latest(mangaId: number) {
		const res = await ajax_get({
			url: 'history/get_latest',
			params: {mangaId},
		});

		if (!res.data.success) {
			return false;
		} else {
			return res.data.data;
		}
	},

	/**
	 * @description: 添加历史记录
	 * @return {*}
	 */
	async add_history() {
		const res = ajax({
			url: 'history/add',
			data: {
				mediaId: global_get('mediaId'),
				mangaId: global_get('mangaId'),
				mangaName: global_get('mangaName'),
				mangaCover: global_get('mangaCover'),
				chapterId: global_get('chapterId'),
				chapterName: global_get('chapterName'),
				chapterPath: global_get('chapterPath'),
				chapterType: global_get('chapterType'),
				chapterCover: global_get('chapterCover'),
			},
        });

        return (await res).data;
	},

	/**
	 * @description: 获取历史记录
	 * @return {*}
	 */
	async get_history(
		page: number | undefined = undefined,
		pageSize: number | undefined = undefined
	) {
		const res = ajax_get({
			url: 'history/get',
			params: {page, pageSize},
        });

        return (await res).data.data;
	},

	/**
	 * @description: 删除历史记录
	 * @param {number} historyId
	 * @return {*}
	 */
	async delete_history(historyId: number) {
		const res = ajax({
			url: 'history/delete',
			data: {
				historyId,
			},
        });

        return (await res).data;
	},
};

export default historyApi;
