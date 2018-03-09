// 商品列表
async function getPdtList(param, userId, ctx) {
	//return await ctx.post('http://172.16.1.101/product/findProductList/' + userId, param)
	return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/findProductList/' + userId, param)
    //return await ctx.post('https://easy-mock.com/mock/5a1bbb039144e669fc6e5e86/manage/manageList')
}

// 批量删除
async function batchDel(param, ctx) {
    return await ctx.servers.marketing.delete(ctx.servers.marketing.options.baseURL + '/product/delBatchProducts', param)
}

// 添加商品
async function addProduct(param, userId, ctx) {
    //return await ctx.post('http://172.16.1.101/product/addProducts/' + userId, param)
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/product/addProducts/' + userId, param)
}

// 根据ASIN查询商品
async function queryASIN(asin, ctx) {

    let str = 'asins='
    asin.forEach((item, index) => {
        if (index == asin.length - 1) {
            str = str + item
        }
        else {
            str = str + item + '&asins='
        }
    })
    let res = await ctx.post(ctx.servers.marketing.options.baseURL + '/product/getProductByAsins/?' + str)
    return res
}

// 根据ASIN和sellerID查询商品
async function getProduct(asin, sellerId, ctx) {

    let str = 'asins='
    asin.forEach((item, index) => {
        if (index == asin.length - 1) {
            str = str + item
        }
        else {
            str = str + item + '&asins='
        }
    })
    let res = await ctx.post(ctx.servers.marketing.options.baseURL + '/product/getProductByProductIds/?' + str + '&sellerId=' + sellerId)
    return res
}

// Amazon分类
async function getAmazonGategories(ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/product/getAmazonGategories')
}

//Google分类 /googleCategory/googleCategory/{parentId}
async function getGoogleCategory(ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/googleCategory/googleCategory/0')
}

// 商品审核失败原因
async function proFailReason(id, putStatus, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/product/getProductFailReason?putStatus=' + putStatus + '&productId=' + id)
}

// 根据pk查询商品详情
async function getProductInfo(ctx, pk) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/product/getProductDetails?pk=' + pk)
}

//获取Google Category
async function googleCategory(ctx, id) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/googleCategory/googleCategory/' + id)
}

// 编辑商品信息
async function modifyProduct(ctx, param) {
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/product/updateProduct',
        method: 'put',
        data: param
    }
    return (await ctx.request(config)).data
}

// 获取店铺列表
async function findShopByPage(ctx, param) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/shop/findShopByPage1', param)
}

export default {
    getPdtList,
    addProduct,
    batchDel,
    queryASIN,
    getAmazonGategories,
    proFailReason,
    googleCategory,
    getProductInfo,
    modifyProduct,
    findShopByPage,
    getGoogleCategory,
    getProduct
}