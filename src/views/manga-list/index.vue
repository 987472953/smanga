<template>
	<div class="manga-list">
		<!-- 漫画列表 -->
		<div class="touch-dom">
			<!-- 加载骨架屏 -->
			<template v-if="loading">
				<list-skeleton />
			</template>
			<template v-else>
				<div :class="['manga-list-box', { block: config.viewType === 'list' }]">
					<manga v-for="(i, k) in list" :key="i.mangaId" :viewType="config.viewType" :mangaInfo="i"
						@contextmenu.prevent="context_menu(i, k)" />
				</div>
			</template>
		</div>

		<!--分页组件-->
		<media-pager ref="pager" :page="page" :count="count" :page-size-config="pageSizes" @page-change="page_change" />

		<!--功能菜单-->
		<rightSidebar :mangaInfo="mangaInfo" :menuPoster="menuPoster" @reload="page_change" />
	</div>
</template>

<script lang="ts">
export default { name: 'manga-list' };
</script>

<script lang="ts" setup>
import {
	computed,
	watch,
	onMounted,
	onBeforeUnmount,
	onActivated,
	ref,
} from 'vue';
import { useRoute } from 'vue-router';
import mangaApi from '@/api/manga';
import store, { config, userConfig, pageSizeConfig } from '@/store';
import { global_get } from '@/utils';
import manga from '@/components/manga.vue';
import mediaPager from '@/components/media-pager.vue';
import listSkeleton from '@/components/list-skeleton.vue';
import rightSidebar from './right-sidebar.vue';
import { screenType } from '@/type/store';
import { mangaPageSize } from '@/store/page-size';
import { mangaInfoType } from '@/type/manga';
import queue from '@/store/quque';
const route = useRoute();

let page = ref(1);
let count = ref(0);
let list = ref<mangaInfoType[]>([]);
let mangaInfo = ref({});
let menuPoster = ref('');
let loading = ref(false);

let pageSizes: number[] = [];
let defaultPageSize = 10;

get_page_size_array();

function get_page_size_array() {
	// 获取默认的页面容量
	const screen: screenType = config.screenType;

	pageSizes = mangaPageSize[screen];
	defaultPageSize = mangaPageSize[screen][0];
}

const mediaId = computed<number>(() => {
	return Number(route.query.mediaId || global_get('mediaId'));
});

// 切换排序规则时 重新加载列表
watch(
	() => userConfig.order,
	() => {
		page_change();
	}
);

onMounted(() => {
	reload();
	route.params.clear = '';

	touch_page_change();
});

onActivated(() => {
	const clear = route.params.clear;

	if (clear) {
		reload();
		route.params.clear = '';
	}
});

function touch_page_change() {

	const listDom = document.querySelector('.touch-dom');
	if (listDom === null) return;

	// 获取手指初始坐标和盒子的原来位置
	var startX = 0;
	// 获取盒子原来的位置
	var x = 0;
	var moveX = 0;

	listDom.addEventListener('touchstart', function (this: HTMLDivElement, e: any) {
		if (config.viewType === 'list') return;
		// 得到初始的手指坐标
		startX = e.targetTouches[0].pageX;
		// 获取盒子坐标
		x = this.offsetLeft;
	})

	listDom.addEventListener('touchmove', function (this: HTMLDivElement, e: any) {
		if (config.viewType === 'list') return;
		// 手指的移动距离= 手指移动之后的坐标 - 手指初始的坐标
		moveX = e.targetTouches[0].pageX - startX;
		// 移动盒子，盒子原来的位置+手指移动的距离
		this.style.left = x + moveX + 'px';
		// 阻止屏幕滚动行为
		e.preventDefault();
	})

	listDom.addEventListener('touchend', function (this: HTMLDivElement, e) {
		if (config.viewType === 'list') return;
		this.style.left = '0';

		// 向左滑动,向右翻页
		if (moveX < -100 && page.value < count.value) {
			page_change(++page.value);
		}

		// 向右滑动,向左翻页
		if (moveX > 100 && page.value > 1) {
			page_change(--page.value);
		}


		moveX = 0;
	})
}

/**
 * 跳页
 * @param page
 * @param pageSize
 */
async function page_change(
	pageParams = 1,
	pageSize: number = defaultPageSize
) {

	if (pageParams !== 1 && pageParams > Math.ceil(count.value / pageSize)) return;
	if (pageParams < 1) return;

	// 获取页码
	page.value = pageParams;
	// 加载骨架屏
	loading.value = true;
	// 取消封面加载任务
	queue.mangaQueue.clear();
	// 清空数据 避免缓存
	list.value = [];

	const res = await mangaApi.get(mediaId.value, page.value, pageSize, userConfig.order);
	list.value = res.list;
	count.value = res.count;

	// 结束加载
	loading.value = false;
}

function reload() {
	list.value = [];
	page_change();
}

/**
 * 打开右侧菜单
 */
function context_menu(mangaInfoProps: any, key: number) {
	menuPoster.value = (list.value[key] as any).blob;
	mangaInfo = mangaInfoProps;
	config.rightSidebar = true;
}
</script>

<style src="@/style/manga-list.less" scoped lang="less"></style>
