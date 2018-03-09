// 添加商品
async function addShop(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/shop', param)
}

// 编辑商品
async function redactShop(param, ctx) {
    let config = {
        url: ctx.servers.marketing.options.baseURL + '/shop',
        method: 'put',
        data: param
    };
    const redact = await ctx.request(config);
    return redact;
}

// 检查店铺唯一性
async function checkShop(shopName, ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/shop/checkShop/' + shopName)
}

// 检查店铺数量
async function selectCount(ctx) {
    return await ctx.get(ctx.servers.marketing.options.baseURL + '/shop/selectCount')
}

// 商品列表
async function findShopList(param, ctx) {
    return await ctx.post(ctx.servers.marketing.options.baseURL + '/shop/findShopByPage', param)
}

// // 删除商铺
// async function deleteShop(id, ctx) {
//     let config = {
//         url: ctx.servers.marketing.options.baseURL + '/shop/' + id,
//         method: 'delete',
//     };
//     const result = await ctx.request(config);
//     return result;
// }

export default {
    addShop,
    checkShop,
    findShopList,
    redactShop,
    selectCount
}