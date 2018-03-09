<template>
	<div>
		<div class="operationBox">
            <div class="nt-page-buttons"  style="float:left;">
                <slot name="page-table-operations">

                </slot>
            </div>

            <div class="nt-page-right-buttons" style="float:right;">
                <slot name="page-table-right-operations">

                </slot>
            </div>
        </div>

		<div class="nt-page-table">
	        <nt-row ref="tableRow">
	            <slot name="page-table" :tableData="tableData">
	            </slot>
	        </nt-row>
	    </div>

	    <div class="nt-page-pagination" v-if="!noPagination">
	        <slot name="page-full-pagination">
	            <nt-pagination
	                    @size-change="handlePageSizeChange"
	                    @current-change="handleCurrentPageChange"
	                    :current-page="page.pageNo"
	                    :page-sizes="[10, 20, 50, 100]"
	                    :page-size="page.pageSize"
	                    layout="total, sizes, prev, pager, next, jumper"
	                    :total="page.totalCount">
	            </nt-pagination>
	        </slot>
	    </div>
    </div>
</template>

<script type="text/javascript">
	import deepmerge from 'deepmerge'

	export default {
		props: {
		 	method: {
		 		type: Function,
                required: true
            },
            noPagination: {
                type: Boolean,
                default: !1
            }
        },

		data() {
			return {
				tableData: [],
				page: {                     //分页信息
                    pageNo:1,
                    pageSize:10,
                    totalCount: 0,
                    totalPages: 0
                }
			}
		},

		methods: {
			//分页大小改变时
            handlePageSizeChange: function(size) {
                this.page.pageSize = size;
                this.page.pageNo = 1;
                this.refreshData();
            },

            //页码变动时
            handleCurrentPageChange: function(pageNo) {
                if (pageNo === 0) {
                    return ;
                }
                this.page.pageNo = pageNo;
                this.refreshData();
            },

//            //点击列排序的处理
//            hanldeRowOrder: function(column, prop, order) {
//                debugger
//                this.orders = [];
//                if (column.prop && column.order) {
//                    //主排序字段的处理，目前只有一个排序字段
//                    this.orders.push({
//                        'orderBy': column.prop, //排序字段
//                        'ascOrDesc': column.order === 'ascending' ? 'asc' : 'desc',      //按什么顺序排，生序asc或者降序desc
//                        'orderIndex': 1          //排序优先级
//                    });
//                }
//               this.refreshData();
//            },



            hanldeRowOrder: function(column, prop, order) {
                //TODO 对于sortable = custom没有做区分
                this.orders = [];
                if(column.column.sortable){
                    // 不需要发起请求，表格自己本地自定义排序
                    return
                }
                else{
                    if (column.prop && column.order) {
                        //主排序字段的处理，目前只有一个排序字段
                        this.orders.push({
                            'orderBy': column.prop, //排序字段
                            'ascOrDesc': column.order === 'ascending' ? 'asc' : 'desc',      //按什么顺序排，生序asc或者降序desc
                            'orderIndex': 1          //排序优先级
                        });
                    }
                    this.refreshData();
                }

            },




            queryParam : function() {
                const query = {
                    param: {}
                };
                
                query.pageSize = this.page.pageSize;
                query.pageNo = this.page.pageNo;

                if (this.orders && this.orders.length) {
                    query.orderParam = this.orders;
                }


                return query;
            },

            async refreshData() {
                try {
                    const loading = this.$loading({
                        fullscreen: true,
                        text: '正在加载列表中'
                    });
                    
                    const response = await this.method(this.queryParam());
                    
                    if (response.data && response.data.page) {
                        this.page = response.data.page;
                        //对于分页pageNo传回0 会造成无限循环， 这里无记录时 页码也是1
                        if (this.page.pageNo ===0) {
                            this.page.pageNo = 1;
                        }
                        //this.$refs.table.data = response.data.data.list;
                        this.tableData = response.data.list || [];
                    } else {
                        this.$alert('列表返回数据异常');
                    }
                    //处理method 立即返回 loading无法消失的问题
                    this.$nextTick(function() {
                        loading.close();
                    });

                } catch (err) {
                    this.ctx.onerror(err);
                }
            },

            injectData(data) {
                this.tableData = data.list
                this.page = data.page
            },

            /**
             * filter变更时重新触发搜索
             *
             **/
            rewatchFilters: function() {
                //因为filter会有动态增加的情况。 这时重新进行watch
                for(let unwatch of this.filterWatches) { //取消watcher
                    unwatch();
                }
                //监听快速搜索切换时， 提交搜索条件
                if (this.filter && this.filter.length) {
                    for(const filter of this.filter) {
                        //this.comboModel[filter.key] = '';
                        let unwatch = this.$watch(`comboModel.${filter.key}`, async function(newVal, oldVal) {
                            await this.refreshData();
                        });
                        this.filterWatches.push(unwatch);
                    }
                }
            },

            /**
             * 获取当前选择的行数据
             **/
            getSelection: function() {
                return this.selected;
            },

            addLisener: function() {
                let me = this
                this.$refs.table = this.$refs.tableRow.$children[0]
                //这里懒得循环去寻找 是否table, 就默认第一个是就好了
                if (this.$refs.table) {
                    //监听列排序方法
                    this.$refs.table.$on('sort-change', function(column, prop, order ) {
                        me.hanldeRowOrder(column, prop, order);
                        //vmlist.$emit('sort-change', [column, prop, order]);
                    });

                    /*this.$refs.table.$on('selection-change', function(selection) {
                        vmlist.selected = selection;
                        vmlist.$emit('selection-change', selection);
                    });*/
                }
            }
		},

		 created: async function() {
            const vmlist = this;
            this.$nextTick(async ()=> {
                this.addLisener()
                await this.refreshData();
            })

            //this.rewatchFilters();
        }
	}
</script>