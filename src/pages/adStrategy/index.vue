<template>
	<div>
		<ad-list></ad-list>
		<!-- <ad-detail v-if="type === 'detail'"></ad-detail> -->
	</div>
</template>

<script type="text/javascript">
	import AdList from './list.vue'
	import AdDetail from './detail.vue'
	//import '!style-loader!css-loader!less-loader!../../style/index.less'
	//import '!style-loader!css-loader!less-loader!../../style/adStrategy/index.less'
	
	export default {
		props: {

		},

		data() {
			return {

			}
		},

		methods: {
			
		},

		computed: {
			type() {
				return 'list'
			}
		},

		created() {
			this.addRouters()

			//this.$router.replace('/adStrategy/list')
		},

		components: {
			AdList,
			AdDetail
		}
	}
</script>