<style lang="less">

</style>
<template>
	<login :loginConfig="loginConfig" :appCode="appCode" :type="type"></login>
</template>

<script type="text/javascript">
	import BIZ from 'xbn-biz-common'
	//import '!style-loader!css-loader!less-loader!../../style/index.less'

	export default {
		data() {
			return {
				// 用户自定义配置
				loginConfig: {
					title : "全网营销",
					logoSrc : "",
					findPwdHref : "/#/findPwd/",
					registHref : "/#/regist/"
				},
				appCode : "fsadfas",
				type : "front"		// 前台登录设置为front 后台登录设置为admin

			}
		},

		created() {
		},

		components: {
			login: BIZ.components.login
		},

		computed: {

		}
	}
</script>
