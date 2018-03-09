import {AdStrategy, AdStrategyDetail, v1,AdStrategyAdd, UserInfo, ProductManage, ProductAdd, FinancialManage,storeInfo,Login, siteInfo} from './pages/index'
import * as MarketingModel from './models/index'
import errors from './config/error'
import '!style-loader!css-loader!less-loader!./style/index.less'
import '!style-loader!css-loader!less-loader!./style/adStrategy/index.less'
import './config/createElement'

const routes = [{
    path: '/ad-strategy',
    component: AdStrategy
}, {
    path: '/ad-strategy/detail/*',
    component: AdStrategyDetail
}, {
    path: '/ad-strategy/add',
    component: AdStrategyAdd
}, {
	path: '/product-manage',
    component: ProductManage
}, {
    path: '/product-manage/add',
    component: ProductAdd
}, {
    path: '/site-info',
    component: siteInfo
}, {
    path: '/storeInfo',
    component: storeInfo
}, {
    path: '/login',
    component: Login
}];

export default {
    errors,
    routes,
    models: [MarketingModel]
}