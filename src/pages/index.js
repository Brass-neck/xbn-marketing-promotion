const AdStrategy = () => import('./adStrategy/list.vue');
const AdStrategyDetail = () => import('./adStrategy/detail.vue');
const AdStrategyAdd = () => import('./adStrategy/add.vue');
const ProductManage = () => import('./productManage/index.vue');
const ProductAdd = () => import('./productManage/add.vue');
const FinancialManage = () => import('./financialManage/index.vue');
const storeInfo = () => import('./store/storeinfo.vue');
const siteInfo = () => import('./siteInfo/list.vue');
const Login = () => import('./user/login.vue');

import '../util/mixins'
import '../util/prototype'
import '../config/components'
//import '../util/user'

export {
	AdStrategy,
	AdStrategyDetail,
	AdStrategyAdd,
	ProductManage,
	ProductAdd,
	FinancialManage,
    storeInfo,
    siteInfo,
	Login
}