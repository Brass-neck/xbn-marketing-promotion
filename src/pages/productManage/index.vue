<style lang="less" scoped>
    .flag_icon {
        background: url(../../images/country_icon.png) no-repeat;
    }

    .flag {
        width: 23px;
        height: 14px;
        position: absolute;
        top: 12px;
        left: 10px;
        display: block;
        vertical-align: -2px;
    }

    /*美国*/
    .amer {
        background-position: -10px -10px;
    }

    .defule_flag .flag {
        position: inherit;
        top: 0px;
        left: 0px;
        display: inline-block;
        margin-right: 7px;
    }

    .opera_btn {
        margin: 0px 8px;
        color: #676a6c;
        transition: color .5s ease 0s;
        i {
            transition: color .5s ease 0s;
            color: #676a6c;
            vertical-align: middle;
        }
        i:hover {
            color: #f8ac59;
            transition: color .5s ease 0s;
        }
    }

    .opera_btn:hover {
        color: #f8ac59;
        transition: color .5s ease 0s;
    }

    .nt-table .nt-tooltip.cell .ellipsis2 {
        white-space: normal;
    }

    .default_img {
        background: url('../../images/default.jpg');
    }

    /*.pdt-title:hover{color:blue!important;text-decoration: underline}*/
    .nt-message {
        right: 15px !important;
    }

    .nt-table__expand-column {
        display: none !important;
    }
    .pro-link {
        margin: 0 6px;
        
    }
    .pro-link:hover {
        color: #f8ac59;
    }
</style>
<template>
    <div class="pdt-manage">
        <template-search-list ref='pageTmpl' title='商品管理' :simple='simpleSearch' :combo='comboSearch'
                              :method='getData'
                              :filter='quickFilter' size="medium">
            <template slot='page-table-operations'>
                <nt-button type="warning" @click="addPdt">添加</nt-button>
                <nt-button type="primary" @click="deletePdt">删除</nt-button>
            </template>

            <template slot='page-table' slot-scope='props' class='contentBox'>
                <div class='contentBox' style="position: relative">
                    <nt-table class="border_layout noBorder" ref='dataTable' :data='props.tableData'
                              :default-sort="defaultSort">
                        <nt-table-column type='selection' width="42" align="center"></nt-table-column>
                        <nt-table-column prop="title" label="商品信息" show-overflow-tooltip min-width="350" sortable1>
                            <template slot-scope="scope">
                                <dl class="tab_dl">
                                    <!--<dt><img style="width:78px;height:78px" onerror="this.src='../../images/default.jpg'" :src="handleImageLink(scope.row.imageLink)" alt=""></dt>-->
                                    <dt class="default_img">
                                        <div :style="scope.row.imageLink ? {width:'80px',height:'80px',background:'#fff url('+ scope.row.imageLink +') no-repeat center center / contain'} : {}"></div>
                                    </dt>
                                    <dd>
                                        <p class="pdt-title tab_dl_link ellipsis2">{{scope.row.title}}</p>
                                        <p class="tab_dl_tips fix">
                                            <span class="fL defule_flag">
                                                <i class="flag_icon flag amer"></i>
                                                <a href="javascript:;" target="_blank">{{scope.row.extractKey}}</a>
                                                <nt-tooltip placement="top" v-if="scope.row.originalUrl">
                                                    <!-- <nt-button type="text"><a target="_blank" :href="scope.row.originalUrl"><i class="amazon-link link-img"></i></a></nt-button> -->
                                                    <a target="_blank" :href="scope.row.originalUrl" class="pro-link"><i class="nt-icon-xbn-62"></i>1</a>
                                                    <div slot="content">亚马逊链接</div>
                                                </nt-tooltip>
                                                <nt-tooltip placement="top" v-if="scope.row.link">
                                                    <!-- <nt-button type="text"><a target="_blank" :href="scope.row.link"><i class="lampsuper-link link-img"></i></a></nt-button> -->
                                                    <a target="_blank" :href="scope.row.link" class="pro-link"><i class="nt-icon-xbn-62"></i>2</a>
                                                    <div slot="content">落地页链接</div>
                                                </nt-tooltip>
                                            </span>
                                        </p>
                                    </dd>
                                </dl>
                            </template>
                        </nt-table-column>
                        <nt-table-column
                                prop="googleCategory" label="Google分类" min-width="100" sortable1>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.googleCategory">-</span>
                                <span>{{scope.row.googleCategory}}</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column
                                prop="formattedPrice" label="价格" min-width="100" sortable="0">
                            <template slot-scope="scope">
                                <span v-if="scope.row.formattedPrice">{{scope.row.formattedPrice}}</span>
                                <span v-if="!scope.row.formattedPrice">-</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column
                                prop="createDate" label="创建时间" min-width="120" sortable>
                        </nt-table-column>
                        <nt-table-column
                                prop="advertisingStrategy" label="广告名称" min-width="160" sortable1>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.advertisingStrategy">-</span>
                                <span>{{scope.row.advertisingStrategy}}</span>
                            </template>
                        </nt-table-column>
                        <nt-table-column
                                prop="putStatus" label="状态" min-width="100" sortable1>

                            <template slot-scope="props" slot="append">
                                <nt-tooltip placement="top">
                                    <nt-button type="text" style="margin-left: 20px; padding: 0;"
                                               @click.stop="stopBubble($event)"><i class="nt-icon-xbn-19 col_f8ac59
"></i></nt-button>
                                    <div slot="content" style="width:280px">
                                        您添加的商品需要先经过Google的审核，会有3种结果：1.正在审核。指Google正在审核商品，这个过程需要一定的时间，请您谅解。2.审核通过。指商品符合Google购物政策，只有本状态的商品才能加入广告策略进行投放。3.审核失败。指商品不符合Google购物政策，无法进行广告投放，您可以删除该商品并添加新的商品。
                                    </div>
                                </nt-tooltip>
                            </template>

                            <template slot-scope="scope">
                                <span v-if="!scope.row.putStatus">{{scope.row.extractStatus == 2 || scope.row.extractStatus == 3? '获取商品失败': '-'}}</span>
                                <!--<span v-if="scope.row.putStatus">{{scope.row.putStatus == 0 ? '正在审核' : scope.row.putStatus == 1 ? '审核通过' : '审核失败'}}</span>-->
                                <span v-if="scope.row.putStatus" v-text="handlePutStatus(scope.row.putStatus)"></span>
                            </template>
                        </nt-table-column>
                        <!-- <nt-table-column
                                prop="advertisingStrategy" label="广告名称" min-width="260" sortable1>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.advertisingStrategy">-</span>
                                <span>{{scope.row.advertisingStrategy}}</span>
                            </template>
                        </nt-table-column> -->
                        <nt-table-column
                                label="操作" min-width="140">
                            <template slot-scope="scope">
                                <div class="operate-box">
                                    <!-- <nt-popover width="240" trigger="click" placement="bottom" :disabled="!deletePopoverShow">
                                         <p>您确定要删除商品吗？</p>
                                         <div class="popoverBtn">
                                             <nt-button type="primary" size="small" @click="deletePdt($event, scope.row)">确定</nt-button>
                                             <nt-button type="primary" size="small" @click="deletePopoverShow=false">取消</nt-button>
                                         </div>-->
                                    <nt-button type="text"
                                               v-if="stMethods(scope.row)"
                                               @click="cause(scope.row.extraReason)">查看原因
                                    </nt-button>
                                    <a href="javascript:void(0);" class="main_color" v-if="canEdit(scope.row)" @click="editPdt(scope.row)">编辑</a>
                                    <a href="javascript:void(0);" class="main_color" v-if="scope.row.putStatus == 11" @click="editPdt(scope.row)">详情</a>
                                    <a href="javascript:void(0);" class="main_color" @click="deletePdt($event, scope.row)">删除</a>
                                    <!-- <nt-tooltip slot="reference" v-if="scope.row.putStatus == 2" :openDelay="200"
                                                class="item curpointer opera_btn vM" :content="auditError"
                                                placement="top">
                                        <i class="nt-icon-xbn-12 f18" @mouseover="proFailReason(scope.row, $event)"></i>
                                    </nt-tooltip>
                                    <nt-tooltip slot="reference" class="item curpointer opera_btn vM" content="删除"
                                                placement="top">
                                        <i class="nt-icon-xbn-13 f18" @click="deletePdt($event, scope.row)"></i>
                                    </nt-tooltip>
                                    
                                    <nt-tooltip slot="reference" class="item curpointer opera_btn vM" content="编辑" placement="top" >
                                        <i class="nt-icon-xbn-14 f18" v-if="!scope.row.putStatus" @click="editPdt(scope.row)"></i>
                                    </nt-tooltip> -->
                                    <!--<nt-button slot="reference" type="text" v-on:click="deletePopoverShow=true" class="mL10">删除</nt-button>-->
                                    <!--</nt-popover>-->
                                </div>
                            </template>
                        </nt-table-column>
                        <nt-table-column width="10" type="expand">
                            <template slot-scope="scope">
                                <edit v-if="isEdit" :row="scope.row"></edit>
                                <detail v-if="!isEdit" :row="scope.row"></detail>
                            </template>
                        </nt-table-column>
                        <template slot="empty" slot-scope="props">
                            内容为空， 马上<a href="/product-manage/add?totalPdtNum=0">添加</a>吧
                        </template>
                    </nt-table>
                </div>
            </template>
        </template-search-list>
    </div>
</template>

<script type="text/javascript">
    import {TemplateSearchList} from 'xbn-biz-components'
    import STATUSCODE from '../../config/statusCode'
    import Edit from './edit.vue'
    import Detail from './detail.vue'
    import FILTER from '../../config/filterConfig'
    //import '!style-loader!css-loader!less-loader!../../style/index.less'

    export default {
        props: {},

        data() {
            return {
                isEdit:!0,
                defaultSort: {
                    prop: 'createDate',
                    order: 'descending'
                },
                statusArr: [
                    {'id': 1, 'value': -1, 'label': '全部'},
                    {'id': 2, 'value': 10, 'label': '获取商品失败'},
                    {'id': 3, 'value': 8, 'label': '待提交审核'},
                    {'id': 4, 'value': 0, 'label': '正在审核'},
                    {'id': 5, 'value': 1, 'label': '审核通过'},
                    {'id': 6, 'value': 2, 'label': '审核失败'},
                    {'id': 7, 'value': 3, 'label': '投放中'},
                    {'id': 8, 'value': 4, 'label': '已关闭'},
                    {'id': 9, 'value': 11, 'label': '已下架'}
                ],
                simpleSearch: [{
                    'value': 'asin',
                    'label': 'ASIN',
                    'placeholder': '请输入商品ASIN搜索'
                }, {
                    'value': 'title',
                    'label': '商品标题',
                    'placeholder': '请输入商品标题搜索'
                }],

                comboSearch: [FILTER.comboSearch.asin, FILTER.comboSearch.googleCategoryRoot, FILTER.comboSearch.title, FILTER.comboSearch.productPrice, FILTER.comboSearch.createDate, FILTER.comboSearch.advertisingStrategy, FILTER.comboSearch.putStatus],
                quickFilter: [FILTER.quick.shopId, FILTER.quick.googleCategoryRoot, FILTER.quick.putStatus, FILTER.quick.createDateNum],
                deletePopoverShow: false,
                totalPdtNum: 0,
                auditError: 'xxx',
                oldQuery: {},
                defaultSortBtn: null
            }
        },

        async created() {

            // google分类获取 与 其列表赋值

            let data = await this.ctx.models.MarketingModel.product.getGoogleCategory(this.ctx),
                dataArr = data.data,
                len = dataArr.length,
                quickFilterCategory = [];

            let ridId = [412, 5605]
            for (let i = 0; i < len; i++) {

                if (ridId.indexOf(dataArr[i].id) > -1) continue

                quickFilterCategory.push({
                    id: dataArr[i].id,
                    label: dataArr[i].category,
                    value: dataArr[i].category
                })
            }
            quickFilterCategory.unshift({
                id:'111',
                label:'全部',
                value:-1
            })

            FILTER.quick.googleCategoryRoot.options = FILTER.comboSearch.googleCategoryRoot.options = quickFilterCategory

                // 状态列表赋值
            FILTER.quick.putStatus.options = FILTER.comboSearch.putStatus.options = this.statusArr

            // 店铺列表赋值
            let shopParam = {
                    pageNo: 1,
                    pageSize: 10e6,
                    query: {userId: 1}
                },
                shopNameRes = await this.ctx.models.MarketingModel.product.findShopByPage(this.ctx, shopParam),
                shopNameList = shopNameRes.data.list;

            shopNameList.forEach((o, i) => {
                o.value = o.id
                o.label = o.shopName
            })

            shopNameList.unshift({
                id:'111',
                label:'全部',
                value:-1
            })

            FILTER.quick.shopId.options = shopNameList
        },

        mounted() {
            setTimeout(i => {

                //this.defaultSortBtn = this.$refs.pageTmpl.$el.getElementsByClassName('is-sortable')[1]
                this.defaultSortBtn = this.$refs.pageTmpl.$el.getElementsByClassName('sort-caret')[3]
                /*let sortsIcon = this.$refs.pageTmpl.$el.getElementsByClassName('sort-caret'),
                    len       = sortsIcon.length
                while (len--) {
                    sortsIcon[len].addEventListener('click', j => {
                        this.sortClicked = !0
                    })
                }*/
            }, 100)
        },

        methods: {
            editPdt: function (row) {
                row.putStatus == 11 ? this.isEdit = !1 : this.isEdit = !0
                let table = this.$refs.dataTable,
                        expand = table.store.states.expandRows,
                        index = expand.indexOf(this.prevExpandRow)

                if (this.prevExpandRow && this.prevExpandRow != row) {
                    //如果不加定时器，edit就不会调用create
                    setTimeout(i => {
                        index > -1 && expand.splice(index, 1)
                }, 100)
                }
                table.store.commit('toggleRowExpanded', row)
                this.prevExpandRow = row
            },
            stopBubble: function () {
                return false
            },
            handlePutStatus: function (status) {
                let swift = {
                    0: '正在审核',
                    1: '审核通过',
                    2: '审核失败',
                    3: '投放中',
                    4: '已关闭',
                    8: '待提交审核',
                    9: '已删除',
                    11: '已下架'
                }
                return swift[status]
            },
            handleImageLink: function (relativePath) {
                /*return relativePath ? this.ctx.servers.marketing.options.img + "/" + relativePath : '../../images/default.jpg'*/
                return relativePath ? this.ctx.servers.marketing.options.img + "/" + relativePath : ''
            },
            handleErrorImageLink: function ($event) {
                $event.target.src = "1"
            },
            toAmazonDetail: function (ASIN) {
                window.open('https://www.amazon.com/gp/product/' + ASIN)
            },
            addPdt: function () {
                this.$router.push('/product-manage/add?totalPdtNum=' + this.totalPdtNum)
            },
            refresh: async function () {
                await this.$refs.pageTmpl.refreshData()//刷新列表
            },
            async proFailReason(row, eve) {
                let putStatus = row.manualReviewStatus == 2 ? 6 : 2
                let res = await this.ctx.models.MarketingModel.product.proFailReason(row.productId, putStatus, this.ctx);
                this.auditError = res.data

                //this.$popconfirm(eve.target, this.auditError)
            },
            deletePdt: async function (eve, row) {
                let checked = row ? [row] : this.$refs.dataTable.selection
                let noCancel = !1
                let text = checked.length ? '是否删除选中商品？' : (noCancel = !0, '请选择商品')
                if (noCancel) {
                    //获取弹出的dom
                    setTimeout(() => {
                        let pops = document.getElementsByClassName('nt-popover'),
                            pop = pops[pops.length - 1]
                        pop.getElementsByTagName('button')[1].style.display = 'none'
                    }, 30)
                }
                await this.$popconfirm(eve.target, text)

                !noCancel && this._delete(checked)
            },
            _delete: async function (checked) {
                let data = {
                    productsForDels: []
                }
                checked.forEach(function (item, index) {
                    data.productsForDels[index] = {
                        pk: item.pk,
                        productId: item.productId,
                        // TODO userid要传进去
                        userId: '1'
                    }
                });
                let res = await this.ctx.models.MarketingModel.product.batchDel(data, this.ctx);

                res.statusCode == STATUSCODE.SUCCESS && (
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    }),
                        this.refresh()
                )
            },
            deletePdt1: async function (eve, pk, pdtId) {
                let data = {
                    productsForDels: []
                }
                if (pk && pdtId) {
                    //单个删除
                    data.productsForDels[0] = {
                        pk: pk,
                        productId: pdtId,
                        // TODO userid要传进去
                        userId: '1'
                    }
                    let res = await this.ctx.models.MarketingModel.product.batchDel(data, this.ctx);

                    res.statusCode == STATUSCODE.SUCCESS && (
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        }),
                            this.deletePopoverShow = false
                    )
                    this.refresh()
                }
                else {

                    /*this.$refs.dataTable.selection.length ?
                            (
                                    this.$confirm('是否删除选中商品？', '提示', {
                                        cancelButtonText: '取消',
                                        confirmButtonText: '确定',
                                        type: 'warning'
                                    }).then(async () => {

                                       this.$refs.dataTable.selection.forEach(function(item, index){
                                           data.productsForDels[index] = {
                                               pk: item.pk,
                                               productId: item.productId,
                                               // TODO userid要传进去
                                               userId: '1'
                                           }
                                       });
                                       let res = await this.ctx.models.MarketingModel.product.batchDel(data, this.ctx);

                                       res.statusCode == STATUSCODE.SUCCESS && (
                                               this.$message({
                                                   type: 'success',
                                                   message: '删除成功!'
                                               }),
                                               this.refresh()
                                       )
                                    })
                            ) :
                            (
                                    this.$popconfirm(eve.target, '请选择商品')
                            )*/
                    let len = this.$refs.dataTable.selection.length
                    this.$popconfirm(eve.target, '请选择商品')
                }
            },

            //用于检测 用户做的什么操作：搜索 还是 排序
            queryCheck(query) {
                if (query.orderInfo) {

                    let oldQ = this.oldQuery.orderInfo,
                        oldP = this.oldQuery.pageNo,
                        ord = query.orderInfo,
                        flag = !0

                    if ((ord.fields[0] === 'createTime' && ord.type[0] !== 'desc') || ord.fields[0] !== 'createTime') {
                        for (let i in oldQ) {
                            if (oldQ[i][0] !== ord[i][0]) {
                                flag = !1
                                break
                            }
                        }

                        if (flag && oldP === query.pageNo) {
                            setTimeout(i => {
                                this.defaultSortBtn.click()
                            }, 100)

                            /*ord.fields[0] = 'createTime'//this.defaultSort.prop
                            ord.type[0] = this.defaultSort.order === 'descending'? 'desc': 'asc'*/
                            //this.$refs.dataTable.clearSort()
                            /*let th   = this.defaultSortBtn.previousElementSibling,
                                keys = ['ascending', 'descending']

                            keys.forEach(i => {
                                if (th.className.indexOf(i) > -1) {
                                    th.className = th.className.replace(i, '')
                                }
                            })

                            this.defaultSortBtn.className = this.defaultSortBtn.className + ' descending'*/


                        }

                    }

                    this.oldQuery = query
                }
            },

            //如果选了全部 则删除此字段
            isAllSelect(query) {
                let q = query.query
                for (let i in q) {
                    q[i] === -1 && delete q[i]
                }
            },



            getData: async function (query) {
                let param = {
                        query: query.param,
                        pageNo: query.pageNo || 1,
                        pageSize: query.pageSize || 10
                    },
                    data;
                query.query = query.param
                delete query.param

                let searchParam = query.searchParam || [],
                    operatorSwift = {
                        lt: '1',
                        gt: '2',
                        eq: '3'
                    }

                if (searchParam.length) {
                    //处理高级搜索
                    for (let i = 0; i < searchParam.length; i++) {
                        let queryKey = searchParam[i].key
                        if (!query.query[queryKey + '1']) {
                            query.query[queryKey + '1'] = searchParam[i].value
                            query.query[queryKey + 'Tag'] = operatorSwift[searchParam[i].operator]
                        }
                        else {
                            // 重复的key
                            query.query[queryKey + '2'] = searchParam[i].value
                            query.query[queryKey + 'Tag'] = '4'
                        }
                    }
                }

                //重组高级搜索时间格式
                if (query.query) {
                    'createDate1 createDate2'.split(' ').forEach(i => {
                        let val = query.query[i],
                            dd = new Date(val).getTime() - (new Date().getTimezoneOffset() * 60 * 1000)
                        val && (query.query[i] = new Date(dd))
                    })
                }

                // 调整 介于 的两条string大小
                let item = ['createDate', 'productPrice']

                for (let j = 0; j < item.length; j++) {
                    if (query.query[item[j] + '1']) {
                        if (query.query[item[j] + '1'] > query.query[item[j] + '2']) {
                            let via = query.query[item[j] + '1']
                            query.query[item[j] + '1'] = query.query[item[j] + '2']
                            query.query[item[j] + '2'] = via
                        }
                    }
                    else {
                        continue
                    }
                }


                /*if(JSON.stringify(query.query) == "{}"){
                    delete query.query
                }
                else{
                    delete query.searchParam
                    delete query.orderParam
                }*/

                //重组后端需要的数据结构
                if (query.orderParam) {
                    let p = query.orderParam[0],
                        orderParamSwift = {
                            createDate: 'createTime',
                            formattedPrice: 'priceFormatted',
                            advertisingStrategy: 'campaignName',
                            putStatus: 'status'
                        }

                    query.orderInfo = {
                        fields: [orderParamSwift[p.orderBy] ? orderParamSwift[p.orderBy] : p.orderBy],
                        type: [p.ascOrDesc]
                    }
                    delete query.orderParam
                }

                this.isAllSelect(query)
                this.queryCheck(query)

                data = await this.ctx.models.MarketingModel.product.getPdtList(query, '1', this.ctx)
                data.data && (this.totalPdtNum = data.data.page.totalCount)
                return data
            },
            //查看原因
            cause: async function (text) {
                let causemes = text;
                this.$alert(`${causemes }`, '失败原因', {
                    customClass:'pro-err-reason',
                    confirmButtonText: '确定',
                });
            },
            //计算查看原因状态
            stMethods(row) {
                return row.putStatus == 2? !0: row.extractStatus == 2 || row.extractStatus == 3? !0: !1
                /*if (row.extractStatus == 2 || row.extractStatus == 3 || row.extractStatus == null) {
                    return true;
                } else if (row.putStatus == 99) {
                    return true;
                } else if (row.putStatus == 2 && row.manualReviewStatus == 1) {
                    return true;
                } else if (row.putStatus == 2 && row.manualReviewStatus == 2) {
                    return true;
                }*/
            },

            canEdit(row) {
                let flag = !1
                if (row.putStatus && row.putStatus != 0) {
                    if (row.putStatus == 2 && row.manualReviewStatus == 1 && row.modifyTime) {
                        let time = (new Date().getTime() - new Date(row.modifyTime).getTime()) / 1000 / 60 / 60
                        flag = time > 4? !1: !0
                    }
                    else if(row.putStatus == 11){
                        flag = !1
                    }
                    else {
                        flag = !0
                    }
                }
                return flag //!scope.row.putStatus || scope.row.putStatus == 0 ? false : true
            }
        },

        mounted() {
        },

        components: {
            TemplateSearchList,
            Edit,
            Detail
        }
    }
</script>