import Axios from "axios";
import {Cookies} from "@/utils";
import Qs from "qs";
import {ElMessage} from "element-plus";

/**
 * 创建默认接口请求设置
 * 传参接收使用json
 * 默认传参 userid 时间戳 密钥
 * @type {Axios}
 */
export const testAxios = Axios.create({
    timeout: 10 * 1000,
    method: "post",
    params: {},
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    transformRequest: [
        data => {
            // 获取时间戳
            const timestamp = new Date().getTime();
            // 初始化传参
            data = data || {};
            // 加入时间戳与密钥
            data = Object.assign(data, {timestamp});
            // 返回json
            return Qs.stringify(data);
        },
    ],
    transformResponse: [
        function (data) {
            data = data || {};

            if (typeof data === 'string') data = JSON.parse(data);

            if (data.message) {
                let type: string;
                switch (data.code) {
                    case 0:
                        type = 'success';
                        break;
                    case 1:
                        type = 'error';
                        break;
                    case 2:
                        type = 'warning';
                        break;
                    default:
                        type = 'info';
                        break;
                }

                ElMessage({
                    message: data.message,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    type: type
                });
            }

            return data;
        },
    ]
});
