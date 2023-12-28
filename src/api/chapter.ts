/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-03-17 20:18:30
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-10-26 20:11:37
 * @FilePath: \smanga\src\api\chapter.ts
 */
import {userConfig} from '@/store';
import {ajax, ajax_get} from './index';
import {global_get} from '@/utils';

interface chapterGetRes {
	records: [];
	total: number;
}

const chapterApi = {
	get: async function (
		mangaId: number | undefined,
		page: number | undefined = undefined,
		pageSize: number | undefined = undefined,
		order = userConfig.order,
		keyWord = ''
	) {
		const res = await ajax_get({
			url: 'chapter/get',
			params: {mangaId, page, pageSize, order, keyWord},
		});
		const resData: chapterGetRes = res.data.data;

		// 接口错误返回默认值
		if (!res.data.success) {
			return {
				list: [],
				count: 0,
			};
		}

		const resFormat: chapterGetFormatType = {
			list: resData.records,
			count: resData.total,
		};

		return resFormat;
	},

	/**
	 * @description: 获取漫画第一章
	 * @param {number} mangaId
	 * @param {string} order
	 * @return {*}
	 */
	async get_first(mangaId: number, order: string) {
		const res = await ajax_get({
			url: 'chapter/get_first',
			params: {mangaId, order},
		});

		return res.data;
	},

	async get_images(chapterId: number) {
		const res = ajax_get({
			url: 'chapter/image',
			params: {
				chapterId: chapterId || global_get('chapterId'),
			},
		});

		const data = (await res).data.data;

		return {
			list: data.images,
			count: data.count,
			state: data.state,
		};
	},

	/**
	 * 修改章节记录
	 * @param data
	 */
	async update_chapter(data: any) {
		const res= ajax({
			url: 'chapter/update',
			data,
		});

		return (await res).data;
	},

	/**
	 * 删除章节记录
	 * @param chapterId
	 * @param deleteFile
	 */
	async delete_chapter(chapterId: any, deleteFile = false) {
		const res= ajax({
			url: 'chapter/delete',
			data: {chapterId, deleteFile},
		});

		return (await res).data;
	},
};

type chapterGetFormatType = {
	list: [];
	count: number;
};

export default chapterApi;
