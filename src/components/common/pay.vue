<template>
	
        <pay :cancelFun="payCancle" :sucCallBack="paySuccess" :errorCallBack="payErr"></pay>
    
</template>

<script type="text/javascript">
	import BIZ from 'xbn-biz-common'

	export default {
		props: {
			
		},

		data() {
			return {

			}
		},

		methods: {
			payCancle() {
                this.showPay = !1
            },
            paySuccess(info) {
                this.$notify({
                    message: '充值成功'
                })
                this.showPay = !1
            },
            payErr(info) {
                this.$notify({
                    message: '服务出错，请联系客服'
                })
                this.showPay = !1
            }
		},

		components: {
			Pay: BIZ.components.pay
		}
	}
</script>