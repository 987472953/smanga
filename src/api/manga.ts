/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-10-26 20:25:18
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-10-26 20:27:28
 * @FilePath: /smanga/src/api/manga.ts
 */
import {ajax, ajax_get} from './index';

const mangaApi = {
    /**
     * @description: 获取漫画列表
     * @param {number} mediaId
     * @param {number} page
     * @param {number} pageSize
     * @param {*} order
     * @return {*}
     */
    async get(
        mediaId: number | undefined,
        page: number,
        pageSize: number,
        order = '',
        keyWord = ''
    ) {
        const res = ajax_get({
            url: 'manga/get',
            params: {mediaId, page, pageSize, order, keyWord},
        });

        return (await res).data.data;
    },

    /**
     * @description: 根据标签获取漫画
     * @return {*}
     */
    async get_by_tags(
        tagIds: string,
        page: number,
        pageSize: number,
        order = ''
    ) {
        const res = ajax_get({
            url: 'manga/get_by_tags',
            params: {tagIds, page, pageSize, order},
        });

        const data: ResType = (await res).data;

        return {
            list: data.data.records,
            count: data.data.count,
        };
    },

    /**
     * @description: 获取漫画元数据
     * @param {number} mangaId
     * @return {*}
     */
    async get_manga_info(mangaId: number) {
        const res = ajax_get({
            url: 'manga/get_manga_info',
            params: {mangaId},
        });

        const data = (await res).data;

        return data.data;
    },

    /**
     * 更改漫画记录
     * @param data
     */
    async update_manga(data: any) {
        const res = ajax({
            url: 'manga/update',
            data,
        });

        return (await res).data;
    },

    /**
     * 删除漫画
     * @param mangaId
     * @param deleteFile
     */
    async delete_manga(mangaId: number, deleteFile = false) {
        const res = ajax({
            url: 'manga/delete',
            data: {mangaId, deleteFile},
        });

		return (await res).data;
	},
};

export default mangaApi;
