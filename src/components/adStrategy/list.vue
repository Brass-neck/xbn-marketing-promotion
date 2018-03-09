<template>
    <div>
        <ad-list></ad-list>
    </div>
</template>

<script type="text/javascript">
    import AdList from './_list.vue'

	export default {
		props: {

		},

		data() {
			return {
                isAdd: !0
			}
		},

		methods: {
            
		},

        created() {
            
        },

		components: {
			AdList
		}
	}
</script>

<style type="text/css" lang="less">
    .tiny-input {
        width: auto;
        > input {
            width: 80px;
            height: 24px;
            padding: 0 3px;
        }
    }
</style>