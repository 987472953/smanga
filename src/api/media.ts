/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-03-17 20:18:30
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-10-24 00:43:56
 * @FilePath: \smanga\src\api\media.ts
 */
import {ajax, ajax_get} from './index';

const mediaApi = {
    /**
     * @description: 获取媒体库记录
     * @param {number} page
     * @param {number} pageSize
     * @return {*}
     */
    async get(page: number, pageSize: number) {
        console.log(page, pageSize)
        const res = ajax_get({
            url: 'media/get',
            params: {page, pageSize},
        });

        const resData = (await res).data;

        return resData;
    },
    /**
     * @description: 更新媒体库信息
     * @param {any} data
     * @return {*}
     */
    async update_media(data: any) {
        const res = ajax({
            url: 'media/update',
            data,
        });

        const resData = (await res).data;

        return resData;
    },

    /**
     * @description: 新增媒体库
     * @param {any} data
     * @return {*}
     */
    async add_media(data: any) {
        const res = ajax({
            url: 'media/add',
            data,
        });
        const resData = (await res).data;
        return resData;
    },

    /**
     * @description: 删除媒体库
     * @param {any} mediaId
     * @return {*}
     */
    async delete_media(mediaId: any) {
        const res = ajax({
            url: 'media/delete',
            data: {mediaId},
        });

        const resData = (await res).data;
        return resData;
    },

    /**
     * @description: 删除路径
     * @param {any} pathId
     * @return {*}
     */
    async delete_path(pathId: any) {
        const res = ajax({
            url: 'path/delete',
            data: {pathId},
        });

        const resData = (await res).data;
        return resData;
    },

    /**
     * @description: 获取路径
     * @return {*}
     */
    async get_path(
        mediaId: any,
        page: number | undefined = undefined,
        pageSize: number | undefined = undefined
    ) {
        const res = ajax_get({
            url: 'path/get',
            params: {mediaId, page, pageSize},
        });

        const resData = (await res).data;

        return resData;
    },
};

export default mediaApi;
