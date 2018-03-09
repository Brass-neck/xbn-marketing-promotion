//获取个人财务信息
async function getPayInfo(userId, ctx) {
	try {
		await ctx.get(ctx.servers.dubbo.options.baseURL + '/rest/pay/info?userId=' + userId)
	} catch(e) {
		//财务返回的 statusCode 是200
		return e.response.data
	}
}

export default {
	getPayInfo,
}