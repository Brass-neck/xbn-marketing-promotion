<template>
	<template-search-list ref="list" title="站点信息管理" :method="getData">
		<template slot="page-table" slot-scope="page">
			<div class="contentBox">
				<nt-table :data="page.tableData">
					<nt-table-column prop="siteName" label="站点名称" min-width="120"></nt-table-column>
					<nt-table-column prop="domain" label="域名" min-width="120"></nt-table-column>
					<nt-table-column prop="merchant" label="Merchant账号" min-width="120"></nt-table-column>
					<nt-table-column prop="adwords" label="Adwords账号" min-width="120"></nt-table-column>
					<nt-table-column prop="amount" label="商品数量" min-width="120"></nt-table-column>
				</nt-table>
			</div>
		</template>
	</template-search-list>
</template>

<script type="text/javascript">
	
	export default {
		props: {

		},

		data() {
			return {

			}
		},

		methods: {
			getData() {
				return  {
							"statusCode":2000000,
							"message":"成功",
							"data":{
								"list":[
									{
										siteName: 'aaa',
										domain: 'www.baidu.com',
										merchant: 'aa.gmail.com',
										adwords: 'bb.gmail.com',
										amount: 20
									}
								],
								"page":{"pageNo":1,"pageSize":10,"totalCount":29,"totalPages":3,"query":null,"orderInfo":null}
							}
						}
			}
		}
	}

</script>

<style type="text/less">
	
</style>