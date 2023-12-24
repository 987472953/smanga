/*
 * @Author: lkw199711 lkw199711@163.com
 * @Date: 2023-09-24 22:29:57
 * @LastEditors: lkw199711 lkw199711@163.com
 * @LastEditTime: 2023-09-24 22:37:58
 * @FilePath: /smanga/src/type/chapter.ts
 */
type chapterInfoType = {
	browseType: string;
	chapterCover: string;
	id: number;
	chapterName: string;
	chapterPath: string;
	chapterType: string;
	createTime: string;
	mangaId: number;
	mediaId: number;
	pathId: number;
	picNum: number;
	updateTime: string;
	page?: number;
};

export { chapterInfoType };
