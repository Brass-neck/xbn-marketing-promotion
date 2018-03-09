//获取广告策略列表
async function getAdList(param, ctx) {
	return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/findUserCampaignByPage', param)
}

//添加广告策略
async function addAd(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign', param)
}

//获取广告策略详情
async function adDetail(id, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/adwords/' + id)
}

//获取广告策略详情中的 消费总额
async function totalConsumption(id, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/reports/' + id)
}

//修改预算
async function modifyBudget(param, ctx) {
	let config = {
        url: ctx.servers.marketing.options.baseURL + '/adwords/campaign',
        method: 'put',
        data: param
    }
    return (await ctx.request(config)).data
}

//关闭广告策略
async function closeAd(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/closeCampaigns', param)
}

//开启广告策略
async function openAd(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/openCampaigns', param)
}

//更改广告状态
async function setStatus(param, ctx) {

}

//删除广告策略
async function deleteAd(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/deleteCampaigns', param)
}

//添加投放商品
async function addLaunchProduct1(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/addProducts/' + 1, param)
}

//添加投放商品
async function addLaunchProduct(param, ctx) {
	return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/product', param)
}

//删除投放商品
async function deleteLaunchProduct(param, ctx) {
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/adwords/campaign/product',
        method: 'delete',
        data: param
    }
    return (await ctx.request(config)).data
}

//关闭投放商品
async function closeLaunchProduct(param, ctx) {
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/adwords/campaign/product/closePruduct',
        method: 'put',
        data: param
    }
    return (await ctx.request(config)).data
}

//开启投放商品
async function openLaunchProduct(param, ctx) {
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/adwords/campaign/product/openPruduct',
        method: 'put',
        data: param
    }
    return (await ctx.request(config)).data
}

//恢复投放商品状态
async function replyLaunchProduct(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/product/replyPruduct', param)
}

//修改投放商品
async function modifyLaunchProduct(param, ctx) {
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/adwords/campaign/product',
        method: 'put',
        data: param
    }
    return (await ctx.request(config)).data
}

//获取现有商品
async function getExistProduct(userId, param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/findProductCompaignList/' + userId, param)
}

//添加新商品
async function addProduct(param, ctx) {
    //userId
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/addProducts/' + 1, param)
}

//广告投放效果数据
async function adResult(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/reports/customerReport', param)
}

//检查广告策略名称是否重复
async function adNameRepeat(adName, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/adwords/checkCampaignName/' + adName)
}

//验证返回数量与当前添加商品数量的和是否大于500
async function asinNumLimit(userId, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/adwords/campaign/product/checkNum/' + userId)
}

//根据asin查找商品
async function asinUnique(asin, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/product/getProductByOneAsin?asin=' + asin)
}

//根据asins查找商品
async function getProByAsins(asins, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/getProductByAsins' + asins)//格式为?asins=1&asins=2...
}

//检查余额是否可支撑本次广告策略开启
async function adOpenCheck(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/openCheck', param)
}

//所有广告策略预算总和
async function allAdBudget(userId, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/findAllBudget/' + userId)
}

//检查该商品是否已被投放
async function proLaunched(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/adwords/campaign/product/checkForRepeat', param)
}

//检查财务是否支撑预算
async function budgetSupported(budget, ctx) {
    let handleBudget = String(budget).indexOf('.') == -1 ? budget : budget.replace('.', 'dot')
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/adwords/campaign/checkBalances/' + handleBudget)
}

export default {
	getAdList,
    addAd,
    adDetail,
    totalConsumption,
	modifyBudget,
    closeAd,
    openAd,
	setStatus,
    deleteAd,
	addLaunchProduct,
    deleteLaunchProduct,
    modifyLaunchProduct,
    closeLaunchProduct,
    openLaunchProduct,
    replyLaunchProduct,
    getExistProduct,
    addProduct,
    adResult,
    adNameRepeat,
    asinNumLimit,
    asinUnique,
    getProByAsins,
    adOpenCheck,
    allAdBudget,
    proLaunched,
    budgetSupported
}