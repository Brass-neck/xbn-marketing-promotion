<template>
    <div>
        <template>
            <simple-list :method='getLaunchedProduct' ref="addProList" class="add-product">
                <template slot='page-table-operations'>
                    <nt-button @click="showExitProduct" type="primary">选择现有商品</nt-button>
                    <nt-button @click="showAddProduct" type="primary" v-if="!1">添加新商品</nt-button>
                    <template v-if="type === 'detail'">
                        <nt-button @click="popPublicShow('_enable', $event, null, '投放')" type="primary">开启</nt-button>
                        <nt-button @click="popPublicShow('_close', $event, null, '停止投放')" type="primary">关闭</nt-button>
                        <nt-button @click="popPublicShow('_delete', $event, null, '删除')" type="primary">删除</nt-button>
                    </template>
                    <template v-if="type === 'add'">
                        <nt-button @click="popPublicShow('_delete1', $event, null, '删除')" type="primary">删除</nt-button>
                    </template>
                </template>
                <template slot='page-table-right-operations'>
                    <template v-if="type === 'detail'">
                        <nt-checkbox v-model="model.showDel" :disabled="showDelDis" v-show="showDel"
                                     @change="refreshData('showDel')" class="mR30">显示“已删除”商品
                        </nt-checkbox>
                        <nt-select
                                v-model="model.launchProducts.status"
                                placeholder="全部状态"
                                @change="statusChange($event, refreshData)"
                                class="status-checkbox vM"
                                :disabled="launchProductsStatusDisabled">
                            <nt-option
                                    v-for="item in model.status"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.value">
                            </nt-option>
                        </nt-select>
                    </template>
                    <nt-input icon="search"
                              :on-icon-clicka="refreshData"
                              @input="refreshData"
                              v-model="model.launchProducts.title"
                              placeholder="请输入商品标题或ASIN进行搜索"
                              class="w370 vM">
                    </nt-input>
                </template>
                <template slot='page-table' slot-scope='props' class="borderT">
                    <!-- <nt-popover placement="right" width="400" ref="statusNoticePop" trigger="hover"
                                :content="getNotice(noticeIndex)"></nt-popover>
                    <i class="col_f8ac59 status-notice nt-icon-xbn-19" ref="statusNotice" v-popover:statusNoticePop></i> -->
                    <div class=''>
                        <nt-table :data='props.tableData' ref="proList" class="noBorder">
                            <nt-table-column type='selection' width="42" align="center"></nt-table-column>
                            <nt-table-column
                                    prop="title" label="商品信息" min-width="300" sortable1="launStatusSort" class="tl">
                                <template slot-scope="scope">
                                    <div class="pro-info">
                                        <img class="d"
                                             :src="scope.row.imageLink"
                                             alt="">
                                        <!-- <span class="c_575958">{{scope.row.productInfo.desc}}</span> -->
                                        <!-- <a class="c_575958" :href="amazon+scope.row.extractKey" target="_blank" v-text="setListTitle(scope.row)"></a> -->
                                        <span class="c_575958" v-text="setAlertTitle(scope.row)"></span>
                                        <p>
                                            <img src="../../images/flag.png" alt="">
                                            <!-- <span>{{scope.row.productInfo.ASIN}}</span> -->
                                            <span>{{scope.row.extractKey}}</span>
                                            <nt-tooltip placement="top" v-if="scope.row.originalUrl">
                                                <a target="_blank" :href="scope.row.originalUrl" class="pro-link"><i class="nt-icon-xbn-62"></i>1</a>
                                                <div slot="content">亚马逊链接</div>
                                            </nt-tooltip>
                                            <nt-tooltip placement="top" v-if="scope.row.link">
                                                <a target="_blank" :href="scope.row.link" class="pro-link"><i class="nt-icon-xbn-62"></i>2</a>
                                                <div slot="content">落地页链接</div>
                                            </nt-tooltip>
                                        </p>
                                    </div>
                                </template>
                            </nt-table-column>
                            <template v-if="type === 'detail'">
                                <nt-table-column
                                        prop="exposure" label="曝光量" min-width="100" sortable>
                                    <template slot-scope="scope">
                                        <span v-text="scope.row.exposure==null?'-':scope.row.exposure "></span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="clicks" label="点击量" min-width="100" sortable>
                                    <template slot-scope="scope">
                                        <span v-text="scope.row.clicks==null?'-':scope.row.clicks"></span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="cpc" label="平均点击单价" min-width="100" sortable :sort-method="cpcSort">
                                    <template slot-scope="scope">
                                        <span v-text="scope.row.cpc==null?'-': decimalFill(scope.row.cpc) + '元'"></span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="earnings" label="销售额" min-width="100" sortable :sort-method="earingSort">
                                    <template slot-scope="scope" slot="append">
                                        <nt-tooltip placement="top" width="400" ref="statusNoticePop" trigger="hover">
                                            <div slot="content" v-text="getNotice(3)"></div>
                                            <i class="col_f8ac59 ml20 nt-icon-xbn-19" ref="statusNotice"></i>
                                        </nt-tooltip>
                                    </template>
                                    <template slot-scope="scope">

                                        <nt-tooltip placement="top" width="400" ref="statusNoticePop" trigger="hover">
                                            <div slot="content" v-text="'约等于人民币：'+`${(scope.row.earnings==null?0:String(scope.row.earnings).slice(1)*6.7).toFixed(2)}`+'元'"></div>
                                            <span
                                            v-text="`${(scope.row.earnings==null?'-':(String(scope.row.earnings).slice(1)*1).toFixed(2) + '美元')}`"></span>
                                        </nt-tooltip>
                                    </template>
                                </nt-table-column>
                            </template>
                            <template v-if="type === 'add'">
                                <nt-table-column
                                        prop="googleCategory" label="Google分类" min-width="120" sortable1="!1">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.googleCategory == null ? '-' : scope.row.googleCategory}}</span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="formattedPrice" label="价格" min-width="120" sortable="!1" :sortMethod1="sortPrice">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.formattedPrice == null ? '-' : scope.row.formattedPrice}}</span>
                                    </template>
                                </nt-table-column>
                                <nt-table-column
                                        prop="createDate" label="创建时间" width="120" sortable>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.createDate == null ? '-' : scope.row.createDate}}</span>
                                    </template>
                                </nt-table-column>
                                <!-- <nt-table-column
                                        prop="advertisingStrategy" label="广告名称" width="160" sortable1>
                                </nt-table-column> -->
                            </template>
                            <nt-table-column
                                    prop="status" label="状态" min-width="90" sortable1="launStatusSort" :sortMethod1="sortLaunchStatus">
                                <template slot-scope="scope" slot="append" v-if="type === 'add'">
                                    <nt-tooltip placement="top" width="400" ref="statusNoticePop" trigger="hover">
                                        <div slot="content" v-html="getNotice(4)"></div>
                                    <i class="col_f8ac59 ml20 nt-icon-xbn-19" ref="statusNotice"></i>
                                    </nt-tooltip>
                                </template>
                                <template slot-scope="scope">
                                    <span v-text="getLaunchStatusText(scope.row)"></span>
                                </template>
                            </nt-table-column>
                            <nt-table-column
                                    label="操作" min-width="100" align="center">
                                <template slot-scope="scope">
                                    <div class="operate-box" v-if="scope.row.status == 11 ? false : true">
                                        <template v-if="type === 'add'">
                                            <nt-button type="text"
                                                       @click="popPublicShow('_delete1', $event, [scope.row], '删除')">删除
                                            </nt-button>
                                        </template>
                                        <template v-if="type === 'detail'">
                                            <nt-button type="text"
                                                       v-if="scope.row.status != 9"
                                                       @click="popPublicShow('_delete', $event, [scope.row], '删除')">删除
                                            </nt-button>
                                            <nt-button type="text"
                                                       v-if="scope.row.status == 3"
                                                       @click="popPublicShow('_close', $event, [scope.row], '停止投放')">关闭
                                            </nt-button>
                                            <nt-button type="text"
                                                       v-if="scope.row.status == 4"
                                                       @click="popPublicShow('_enable', $event, [scope.row], '投放')">开启
                                            </nt-button>
                                            <nt-button type="text"
                                                       v-if="scope.row.status == 9"
                                                       @click="popPublicShow('_restore', $event, [scope.row], '恢复')">恢复
                                            </nt-button>
                                            <nt-button type="text"
                                                       v-if="stMethods(scope.row)"
                                                       @click="cause(scope.row.reviewFailReason)">查看原因
                                            </nt-button>
                                        </template>
                                    </div>
                                </template>
                            </nt-table-column>
                            <template slot="empty" slot-scope="props">
                                您还没有添加任何商品!
                            </template>
                        </nt-table>
                    </div>
                </template>
            </simple-list>
        </template>
        <nt-dialog title="添加投放商品" class="showPro-box" :visible.sync="showAddPro" size="small" @close="showAddPro = !1">
            <div>
                <nt-tooltip placement="top" width="400" trigger="hover" ref="titleNoticePop">
                    <div slot="content">
                        <slot>{{noticeAdd6}}<br/>{{noticeAdd6_1}}</slot>
                    </div>
                    <i class="nt-icon-xbn-19 col_f8ac59 f16 showAddProNotice"></i>
                </nt-tooltip>
            </div>
            <nt-form
                    ref="productForm"
                    :model="product"
                    :rules="proRules"
                    label-width="120px">
                <div class="add-product-box-notice">
                    <i class="nt-icon-star-on"></i>
                    目前系统仅支持添加Amazon，后续会扩展至更多平台。
                </div>
                <nt-form-item label="商品ASIN：" prop="asin">
                    <nt-input type="textarea" v-model="product.asin" :rows="4" placeholder="请输入商品ASIN"
                              class="add-product-box-textarea"></nt-input>
                    <nt-tooltip placement="top" width="400" ref="asinNoticePop" trigger="hover">
                        <div slot="content" v-text="getNotice(5)" style="width: 280px;"></div>
                        <i class="nt-icon-xbn-19 col_f8ac59 f16 vt"></i>
                    </nt-tooltip>
                </nt-form-item>
                <nt-form-item label="商品站点：" prop="country" style="margin-top: 36px;">
                    <i class="select-country-img"></i>
                    <nt-select
                            v-model="model.country"
                            placeholder="美国"
                            disabled
                            class="w160 country-select">
                        <nt-option
                                v-for="item in model.countrys"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value">
                        </nt-option>
                    </nt-select>
                </nt-form-item>
            </nt-form>
            <div slot="footer">
                <button type="button" @click="addProduct"
                        class="nt-button nt-button--default nt-button--primary">
                    <span>确认</span>
                </button>
                <button type="button" @click="showAddPro = !1"
                        class="nt-button nt-button--default nt-button--primary">
                    <span>取消</span>
                </button>
            </div>
        </nt-dialog>

        <nt-dialog title="选择现有商品" :visible.sync="showChoosePro" size="small" @close="showChoosePro = !1" custom-class="w880">
            <div>
                <nt-tooltip placement="top" width="400" trigger="hover" ref="titleNoticePop">
                    <div slot="content">
                        <slot>{{noticeDet8}}<br/>{{noticeDet8_1}}</slot>
                    </div>
                    <i class="nt-icon-xbn-19 col_f8ac59 f16 showAddProNotice"></i>
                </nt-tooltip>
            </div>
            <div class="mb20 tr">
                <nt-input icon="search"
                          placeholder="请输入商品标题或ASIN进行搜索"
                          v-model="model.exitProducts.proTitle"
                          @input="refreshExistData"
                          class="large-input"></nt-input>
            </div>
            <nt-table :data='tableData' ref="list" height="400" :default-sort="existPorDefaultSort" class="mB20">
                <nt-table-column type='selection' width="42" align="center"></nt-table-column>
                <nt-table-column
                        prop="title" label="商品信息" min-width="200" sortable1 class="tl" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="pro-info">
                            <img class="d" :src="scope.row.imageLink" alt="">
                            <!-- <a class="c_575958" :href="amazon+scope.row.extractKey" target="_blank"
                               v-text="setAlertTitle(scope.row)"></a> -->
                            <span class="c_575958" v-text="setAlertTitle(scope.row)"></span>
                            <p>
                                <img src="../../images/flag.png" alt="">
                                <span>{{scope.row.extractKey}}</span>
                            </p>
                        </div>
                    </template>
                </nt-table-column>
                <nt-table-column
                        prop="googleCategory" label="Google分类" width="120" sortable1>
                    <template slot-scope="scope">
                        <span>{{scope.row.googleCategory == null ? '-' : scope.row.googleCategory}}</span>
                    </template>
                </nt-table-column>
                <nt-table-column prop="formattedPrice" label="价格" width="100" sortable="!1">
                    <template slot-scope="scope">
                        <span>{{scope.row.formattedPrice == null ? '-' : scope.row.formattedPrice}}</span>
                    </template>
                </nt-table-column>
                <nt-table-column
                        prop="createDate" label="创建时间" width="100" sortable>
                    <template slot-scope="scope">
                        <span>{{scope.row.createDate == null ? '-' : scope.row.createDate}}</span>
                    </template>
                </nt-table-column>
                <!-- <nt-table-column
                        prop="createDate" label="广告名称" width="100">
                    <template slot-scope="scope">
                        <span>广告名称</span>
                    </template>
                </nt-table-column> -->
                <nt-table-column prop="putStatus" label="状态" width="100" sortable1="!1">
                    <template slot-scope="scope">
                        <span v-text="launchProStatus[scope.row.putStatus]"></span>
                        <!-- <span :filter-method="putStatusFormatter(scope.row)">{{scope.row.putStatusChange}}</span> -->
                    </template>
                </nt-table-column>
                <template slot="empty" slot-scope="props">
                    您还没有添加任何商品
                </template>
            </nt-table>
            <span slot="footer" class="dialog-footer ">
                <nt-button type="primary" @click="chooseProduct">确定</nt-button>
                <nt-button type="primary" @click="showChoosePro = !1">取消</nt-button>
            </span>
        </nt-dialog>
    </div>
</template>

<script type="text/javascript">
    import {PageHead, TemplateSearchList} from 'xbn-biz-components'
    import SimpleList from '../common/list.vue'
    import CONSTANTS from '../../config/adStrategy/const'
    import STATUSCODE from '../../config/statusCode'
    import BIZ from 'xbn-biz-common'

    export default {
        props: {
            type: {
                type: String,
                default: 'add'
            },
            proRules: {
                type: Object,
                default() {
                    return {
                        asin: [
                            {required: true, message: '请输入商品ASIN', trigger: 'blur'},
                            {
                                validator: async (rule, value, callback) => {
                                    let asin = value.split('\n');
                                    let a = asin.filter(time => time !== '')
                                    let s = a.every(time => {
                                        return /^([A-Z0-9]{10})$|^(\d{10})$/.test(time)
                                    });
                                    if (s) {
                                        let n
                                        (n = await this.checkAsinNumLimit(asin)) === !1 ? callback() : callback(`商品总数超出500个的最大限制，您本次最多只能添加${n}个ASIN，请修改后并重新保存`)
                                    } else {
                                        callback(new Error("请输入正确的ASIN"));
                                    }
                                }
                            }
                        ], country: [
                            {required: true, message: '请输入旧密码', trigger: 'blur'}
                        ]
                    }
                }
            },
            //用于介绍外面传来的 投放商品列表
            products: {
                type: Object,
                default() {
                    return {}
                }
            },
            adId: '',
            existPorDefaultSort: {
                default() {
                    return {
                        prop: 'createDate',
                        order: 'descending'
                    }
                }
            }
        },

        data() {
            return {
                noticeAdd6: CONSTANTS.notice.noticeAdd6,
                noticeAdd6_1: CONSTANTS.notice.noticeAdd6_1,
                noticeDet8: CONSTANTS.notice.noticeDet8,
                noticeDet8_1: CONSTANTS.notice.noticeDet8_1,
                amazon: 'https://www.amazon.com/gp/product/',
                ImageLink: this.ctx.servers.marketing.options.img + '/',
                model: {
                    exitProducts: {
                        proTitle: ''
                    },
                    launchProducts: {
                        title: '',
                        status: '',
                        isDelete: '0' //0 - 不展示已删除，
                    },
                    type: '1',
                    status: CONSTANTS.lanchStatus,
                    countrys: [{
                        value: '0',
                        label: '美国'
                    }]
                },
                showDel: !0,
                showDelDis: !1,
                product: {
                    country: 'am'
                },
                launchedProduct: {
                    statusCode: '2000000',
                    data: {
                        page: {'pageNo': 1, 'pageSize': 10, 'totalCount': 0, 'totalPages': 1},
                        list: []
                    }
                },
                launchProStatus: CONSTANTS.launchProStatus,
                launchProStatus2: CONSTANTS.launchProStatus2,
                noticeIndex: this.type === 'add' ? 4 : 3,
                showAddPro: !1,
                showChoosePro: !1,
                launchProductsStatusDisabled: !1,
                adModel: this.ctx.models.MarketingModel.ad,
                popModelPub: {
                    show: !1,
                    text: '',
                    invoke: function () {
                    },
                    selected: null
                },
                launchedProductCollect: {
                    page: {'pageNo': 1, 'pageSize': 10, 'totalCount': 0, 'totalPages': 1},
                    list: []
                },
                //状态排序
                sortRule: [{
                    '1': 0,//审核通过
                    '0': 1//正在审核
                }, {
                    '3': 0,//投放中
                    '4': 1,//已关闭
                    '9': 2,//已删除
                    '0': 3,//正在审核
                    '2': 4//审核失败
                }],
                //投放商品中 状态排序， 如果是添加页的：需要，如果是详情页的：不需要，直接用后端返回的数据即可
                launStatusSort: !(this.type === 'add'? 1: 0),
                lastEvent: null,
                launchedProductTotalOriginl: [],//新增广告中，用于存放所有添加的 投放商品
                launchedProductTotal: [],//新增广告中，用于存放需要展示的 投放商品
                asinLimit: 500,
                param: {
                    pageNo: 1,
                    pageSize: 100000,
                    orderInfo: {
                        fields: ['createTime'],
                        type: ['desc']
                    },
                    query: {
                        searCondif: '',
                        userId: 1
                    }
                },
                sortChangeBinded: !1,
               // tableData: [{
               //     imageLink: null,
               //     price: "130",
               //     categoryRoot:
               //         "Pullovers",
               //     title:null,
               //
               //     extractKey: 'B071S8ZFLT',
               // }]
                tableData: []
            }
        },

        methods: {
            cpcSort:function(a,b){
                return a.cpc - b.cpc > 0
            },
            earingSort:function(a,b){
                return a.earnings.split("$")[1] - b.earnings.split("$")[1] > 0
            },
            putStatusFormatter(row) {
                switch (row.putStatus) {
                    case '0' :
                        row.putStatusChange = '正在审核';
                        break;
                    case '1' :
                        row.putStatusChange = '审核通过';
                        break;
                    case '2' :
                        row.putStatusChange = '审核失败';
                        break;
                    case '3' :
                        row.putStatusChange = '投放中';
                        break;
                    case '4':
                        row.putStatusChange = '已关闭';
                        break;
                    case '9':
                        row.putStatusChange = '已删除';
                        break;
                }
            },

            //给 现有商品 状态排序
            sortExistStatus(a, b) {
                this.sortStatus(a, b)
            },

            //给 投放商品 状态排序
            sortLaunchStatus(a, b) {
                this.sortStatus(a, b, this.type === 'add'? 0: 1)    
            },

            sortStatus(a, b, sortType = 0) {
                let s  = this.sortRule[sortType],
                    a1 = s[a.putStatus],
                    b1 = s[b.putStatus]
                
                return a1 > b1? 1: a1 < b1? -1: 0
            },

            sortPrice(a, b) {
                let getNumber = val => {
                   return  Number((val.formattedPrice || '$0').replace('$', ''))
                }

                return getNumber(a) - getNumber(b)
            },

            getLaunchStatusText(row) {
                return this.type === 'add'? this.launchProStatus[row.putStatus]: this.launchProStatus2[row.status]
                //return this.launchProStatus[row[this.type === 'add'? 'putStatus': 'status']]
            },

            setAlertTitle(row) {
                return row.title == null ? '系统正在收集商品信息，可能要花费一点时间，请耐心等待。' : row.title
            },
            setListTitle(row) {
                let waitText = null,
                    textType1 = '系统正在收集商品信息，可能要花费一点时间，请耐心等待。',
                    textType2 = '您添加的ASIN有误或网络原因，无法获取商品信息，请删除本商品并重新添加商品。'

                if (row.title == null) {
                    if (row.extractStatus == 0 || row.extractStatus == 1){
                        waitText = textType1;
                    }else if (row.extractStatus == 2 || row.extractStatus == 3) {
                        waitText = textType2
                    }
                    !row.extractStatus && (row.title = textType1)
                } else {
                    waitText = row.title
                }
                return waitText
            },

            //添加广告的删除
            _delete1(selection) {
                selection.forEach(ii => {
                    this.launchedProductTotalOriginl.every((item, i) => {
                        let flag = !0
                        if (item.productId == ii.productId) {
                            flag = !1
                            this.launchedProductTotalOriginl.splice(i, 1)
                        }
                        return flag
                    })
                })
                this.newLaunchProduct()
            },

            statusChange(val, callback) {
                let i, t = this
                t.showDel = !((i = 'null9'.indexOf(val)) > -1 ? (t.showDelDis = t.model.showDel = !(i === 0 ? 1 : 0), 0) : 1)
                callback()
            },

            //
            async _delete(selection) {
                this.productOperate(selection, 'deleteLaunchProduct', '删除')
            },

            async _restore(selection) {
                let param = this.generateParam(selection)
                let me = this
                //在恢复之前，需要检查该商品是否已在别的广告中投放
                try {
                    let res = await this.adModel.proLaunched(param, this.ctx)
                    _checkPro()
                } catch (e) {
                    let msg = e.response.data.message.match(/正在\S*投放/)[0]
                    this.popModelPub.text = `${msg}，执行本操作会将商品在原广告中删除，是否确定继续恢复？`,
                        this.popModelPub.invoke = _checkPro
                    this.addConfirm()
                }

                //检查 改商品是否被已被删除
                async function _checkPro() {
                    //当前只做单个恢复，不支持批量恢复
                    let res = await me.adModel.asinUnique(param[0].productId, me.ctx)
                    if (res.data) {
                        me.productOperate(selection, 'replyLaunchProduct', '恢复')
                    } else {
                        me.$message({
                            message: `商品已被删除，无法恢复，请重新添加商品`,
                            showClose: !0,
                            type: 'error'
                        })
                    }
                }
            },

            async _enable(selection) {
                if (this.$parent.adStatus == 1) {
                    this.$message({
                        message: '请先开启当前广告。',//'当前广告为关闭状态, 请先去开启广告',
                        showClose: !0,
                        type: 'error'
                    })
                    //this.$parent.back()
                    return
                }
                this.productOperate(selection, 'openLaunchProduct', '开启')
            },

            async _close(selection) {
                this.productOperate(selection, 'closeLaunchProduct', '关闭')
            },

            generateParam(selection) {
                let param = []
                selection.forEach(item => {
                    param.push({
                        pk: item.pk,
                        productId: item.productId,
                        status: item.status,
                        userCampaignId: item.campaginId,
                        userId: 1
                    })
                })

                return param
            },

            async productOperate(selection, type, text) {
                let param = this.generateParam(selection)
                let successAlert = !0
                let not = ''
                switch (text) {
                    //如果是恢复 只支持一条数据
                    case '恢复':
                        param = param[0]
                        break
                    //如果是开启 需查看商品是否有库存
                    case '开启':
                        let asins = '?'
                        selection.forEach(i => {
                            asins += `asins=${i.productId}&`
                        })
                        let res1 = await this.adModel.getProByAsins(asins, this.ctx)
                        if (res1.data) {
                            let dd = res1.data
                            res1.data.forEach(i => {
                                if (i.availability === 'Out of Stock') {
                                    /*successAlert = !1
                                    this.$message({
                                        message: '库存为零的商品无法开启',
                                        showClose: !0,
                                        type: 'error'
                                    })
                                    return !0*/
                                    not += i.productId + ' '
                                    param.forEach((j, ii) => {
                                        if (i.productId == j.productId) {
                                            param.splice(ii, 1)
                                            return
                                        }
                                    })
                                } else {
                                    //return !1
                                }
                            })
                            let noticeText = this.$refs.proList.selection.length? `ASIN为 ${not}无法开启, 因为库存为零`: `库存为零的商品无法开启。`
                            if (not) {
                                this.$message({
                                    message: noticeText,
                                    showClose: !0,
                                    type: 'error'
                                })
                            }
                        }
                        break
                }
                
                if ((param instanceof Array && param.length) || typeof param === 'object'){
                    let res = await this.adModel[type](param, this.ctx)
                    if (res.statusCode == STATUSCODE.SUCCESS) {
                        if (!not) {
                            this.$message({
                                message: `${text}成功`,
                                type: 'success',
                                showClose: true
                            })
                        }
                        this.launchProFromServer()
                    } else {
                        this.$alert()
                    }
                }
            },

            popPublicShow(invoke, eve, selection, title) {
                let selected = selection || this.$refs.proList.selection || [];
                let popText = selected.length ? `您确定要${title}所选商品吗？` : `请选择商品`
                if (selected.length && title === '删除') {
                    popText = `您确定要删除所选商品吗？`;
                    /*switch (title) {
                        case '开启':
                            popText = `是否${title}投放商品`;
                            break;
                        case '关闭':
                            popText = `是否${title}投放商品`;
                            break;
                        case '删除':
                            popText = `批量删除选中的竞品跟踪，系统将清空这些竞品数据，确认要删除吗？`;
                            break;*/
                }
                /*}else {
                    popText='请选择商品';
                }*/

                this.popModelPub = {
                    show: !0,
                    text: popText,
                    invoke: () => {
                        selected.length && this[invoke](selected)
                        return false
                    },
                    cancle: selected.length ? !0 : !1,
                    selected: selected
                }

                //this.setPopPubPosition(eve)
                this.addConfirm(eve)
            },

            //如果没有eve 会把之前的 eve当做锚点
            async addConfirm(eve = this.lastEvent) {
                this.lastEvent = eve
                let bodyClazz = document.body.className
                !this.popModelPub.cancle && (document.body.className += ' hideConfirmCanBtn')
                await this.$popconfirm(eve.target, this.popModelPub.text)
                document.body.className = bodyClazz
                this.popModelPub.invoke()
            },

            setPopPubPosition(eve) {
                let g = eve.target,
                    t = g.tagName === 'BUTTON' ? g : g.parentElement,
                    h = t.clientHeight,
                    w = t.clientWidth

                let wid = 160,
                    top = t.offsetTop + h + 10,
                    left = t.offsetLeft - (wid / 2) + (w / 4)

                //this.$refs.popPublic.reference = eve.target
                let e = this.$refs.popPublic.$el.children[0]
                e.style = `width: ${wid}px;position:absolute;left:${left}px;top:${top}px;`
            },

            getNotice(i) {
                return CONSTANTS.notice['noticeAdd' + i]
            },

            showExitProduct() {
                this.showChoosePro = !0;
                this.getExistProduct();
                this.model.exitProducts.proTitle =
                    this.param.query.searCondif = ''

                if (!this.sortChangeBinded) {
                    this.sortChangeBinded = !0
                    setTimeout(() => {
                        this.sortChange()    
                    }, 100)
                }
            },

            showAddProduct() {
                this.showAddPro = !0
                this.product.asin = ''
            },

            //刷新 已存在商品
            refreshExistData() {
                this.param.query.searCondif = this.model.exitProducts.proTitle
                this.getExistProduct()
            },

            //刷新 已投放商品 分两种情况
            refreshData(type, val) {
                switch (this.type) {
                    case 'detail':
                        this.refreshDataByServer(type, val)
                        break
                    case 'add':
                        this.refreshDataBySelf()
                        break
                }
            },

            //自己内部的搜索
            refreshDataBySelf() {
                this.newLaunchProduct()
            },

            //给服务端传参数的搜索
            refreshDataByServer(type, val) {
                if (type === 'showDel') {
                    if (!this.model.showDel) {
                        this.launchProductsStatusDisabled = !1
                        this.model.launchProducts.isDelete = '0'
                    } else {
                        this.launchProductsStatusDisabled = !0
                        this.model.launchProducts.isDelete = null
                    }
                }
                this.model.launchProducts.status === '9' && (this.model.launchProducts.isDelete = null)
                let par = this.$parent
                for (let i in this.model.launchProducts) {
                    par.reportParam.pagingInfo.query[i] = this.model.launchProducts[i]
                }
                this.model.launchProducts.title ? (par.reportParam.pagingInfo.query.productId = this.model.launchProducts.title) : par.reportParam.pagingInfo.query.productId = ''
                this.launchProFromServer()
            },

            //从现有商品中 选择出 投放商品
            chooseProduct() {
                let ids = [],
                    selected = this.$refs.list.selection

                if (selected && selected.length) {
                    /*selected.forEach(item => {
                        ids.push(item.productId)
                    })*/
                    this.addLaunchProduct(selected, this.type)
                }
                this.showChoosePro = !1;
            },


            //添加新商品
            addNewPro(ids) {
                this.showAddPro = !1
                this.showChoosePro = !1

                let me = this

                ids.forEach(i => {
                    doAdd(i)
                })

                //先检查唯一性，再添加
                async function doAdd(id) {

                    let res1 = await me.adModel.asinUnique(id, me.ctx)
                    if (res1.data) {
                        me.$message({
                            message: 'ASIN是' + id + '的商品已存在，无法重复添加。',
                            type: 'error',
                            showClose: !0
                        })
                        return
                    }
                    let param = {
                            ids: [id],
                            campaignId: parseInt(me.adId),
                            marketplaceId: 'A2EUQ1WTGCTBG2',
                            type: 'awsProductExtractor'
                        },
                        res = await me.adModel.addProduct(param, me.ctx)

                    if (res.statusCode == STATUSCODE.SUCCESS) {
                        me.$message({
                            message: `新商品添加成功`,
                            type: 'success',
                            showClose: !0
                        })
                        me.afterNewProAdded(res.data[0])
                    } else {
                        //me.$alert('出错了')
                    }
                }
            },

            //新加商品添加完后动作
            afterNewProAdded(d) {
                switch (this.type) {
                    case 'detail':
                        this.addLaunchProductByIds([d])
                        this.launchProFromServer()
                        break
                    case 'add':
                        let pro = {
                            productId: d.productId,
                            extractKey: d.extractKey,
                            putStatus: d.status || '0',
                            price: '——',
                            categoryRoot: '——',
                            pk: d.pk,
                            status: d.status || '0'
                        }
                        //清空搜索
                        this.model.launchProducts.title = ''
                        this.newLaunchProduct([pro])
                        break
                }
            },

            async addLaunchProductByIds(selection) {

                let me = this
                let param = []
                selection.forEach(i => {
                    param.push({
                        pk: i.pk,
                        productId: i.productId,
                        status: i.putStatus || i.status,
                        userCampaignId: this.adId,
                        userId: 1
                    })
                })
                let res = await me.adModel.addLaunchProduct(param, me.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    /*me.$message({
                        message: '投放商品添加成功',
                        type: 'success',
                        showClose: !0
                    })*/
                    if(res.message.indexOf('已存在') > -1){
                        // asin已存在该广告策略中，不可重复添加。
                        me.$message({
                            message: res.message,
                            type: 'error',
                            showClose: !0
                        })
                    }
                    else{
                        me.$message({
                            message: '添加成功！',
                            type: 'success',
                            showClose: !0
                        })
                    }
                    me.launchProFromServer()
                    //me.$parent.getReportData()
                } else if (res.statusCode == 2000010) {
                    me.launchProFromServer()
                    me.$message({
                        message: res.message,
                        type: 'error',
                        showClose: !0
                    })
                } else {
                    me.$alert('出错了')
                }
            },

            addLaunchProduct(selection, type) {
                switch (type) {
                    //详情中的添加 投放商品需要调用后端添加接口
                    case 'detail':
                        let ids = []
                        this.addLaunchProductByIds(selection)
                        break
                    //添加广告中 只需存放id
                    case 'add':
                        //清空搜索
                        this.model.launchProducts.title = ''
                        this.newLaunchProduct(this.$refs.list.selection)
                        this.$refs.list.clearSelection()
                        break
                }
            },

            //新增广告中，过滤需要展示的数据
            searchLaunchedProductTotal() {
                let title = this.model.launchProducts.title
                if (title) {
                    this.launchedProductTotal = []
                    this.launchedProductTotalOriginl.forEach(i => {
                        if ((i.title && i.title.toLowerCase().indexOf(title.toLowerCase()) > -1) || (i.extractKey == title)) {
                            this.launchedProductTotal.push(i)
                        }
                    })
                } else {
                    this.launchedProductTotal = this.launchedProductTotalOriginl
                }
            },

            //投放商品添加后，生成一条添加商品数据, 适用于详情页的
            newLaunchProduct(pro) {
                if (pro) {
                    pro.forEach(i => {
                        let exist = !1
                        this.launchedProductTotalOriginl.forEach(j => {
                            i.productId === j.productId && (exist = !0)
                        })
                        !exist && this.launchedProductTotalOriginl.push(i)
                    })
                    //this.launchedProductTotalOriginl = this.launchedProductTotalOriginl.concat(pro)
                }
                //生成需要展示的 投放商品
                this.searchLaunchedProductTotal()
                //this.launchedProductTotal = this.launchedProductTotal.concat(pro)
                //this.launchedProductTotalOriginl.concat(this.launchedProductTotal)
                let total = this.launchedProductTotal,
                    col = this.launchedProductCollect

                col.page.totalCount = total.length
                col.page.totalPages = total.length % col.page.pageSize
                let size = col.page.pageSize > total.length ? total.length : col.page.pageSize
                col.list = []
                for (let i = 0; i < size; i++) {
                    total[i].status = total[i].putStatus
                    col.list.push(total[i])
                }

                this.$children[0].injectData(col)
            },

            //添加新商品
            addProduct() {
                this.$refs.productForm.validate(async (valid) => {
                    if (valid) {

                        let asins = this.product.asin.split('\n')
                        //res = await this.checkAsinNumLimit()
                        //TODO
                        /*if (res.statusCode == STATUSCODE.SUCCESS) {
                            let added = parseInt(res.data[0]),
                                left  = this.asinLimit - added
                            if (added + asins.length > this.asinLimit) {
                                let _h = this.$createElement
                                this.$message({
                                    message: _h('div', null, [
                                        _h('p', null, `商品总数超出500个的最大限制，您本次最多`),
                                        _h('p', null, `只能添加${left}个ASIN，请修改后并重新保存`)
                                    ]),
                                    showClose: !0
                                })
                                return
                            }*/
                        this.addNewPro(asins)
                        /*} else {
                            this.$alert('something wrong')
                        }*/
                    }
                })
            },

            async checkAsinNumLimit(asins) {
                //userId
                let res = await this.adModel.asinNumLimit(1, this.ctx)

                if (res.statusCode == STATUSCODE.SUCCESS) {
                    let added = parseInt(res.data[0]),
                        left = this.asinLimit - added

                    return (added + asins.length > this.asinLimit) ? left : !1

                } else {
                    this.$alert('something wrong')
                }
            },

            //获取已投放商品
            //这里涉及到分页，所以要麻烦点，得区分详情页还是添加页
            async getLaunchedProduct(param) {
                switch (this.type) {
                    case 'add':
                        this.launchedProductCollect.list = this.launchProFromData(param)
                        this.launchedProduct.data = this.launchedProductCollect
                        break
                    case 'detail':
                        if (param && param.orderParam) {
                            let p = param.orderParam[0]
                            this.$parent.reportParam.pagingInfo.orderInfo = {
                                fields: [p.orderBy],
                                type: [p.ascOrDesc]
                            }
                        }
                        await this.launchProFromServer(param)
                        break
                }
                return this.launchedProduct
            },

            //已投放商品 从数据中筛选
            launchProFromData(param) {
                let page = this.launchedProductCollect.page,
                    no   = page.pageNo,
                    size = page.pageSize

                let order
                if (param.orderParam && (order = param.orderParam[0])) {
                    this.launchedProductTotal.sort((a, b) => {
                        let res
                        switch(order.orderBy) {
                            case 'formattedPrice':
                                res = this.sortPrice(a, b)
                                break
                            case 'status':
                                res = this.sortStatus(a, b)
                                break
                            default:
                                let a1 = a[order.orderBy],
                                    b1 = b[order.orderBy]

                                res = a1 > b1? 1: a1 < b1? -1: 0
                                break    
                        }

                        order.ascOrDesc === 'desc' && (res = -res)

                        return res
                    })
                }    
                
                return this.launchedProductTotal.slice(size * (no -1), size * no - 1)
            },

            //已投放商品 从server中筛选
            async launchProFromServer(param) {
                let p = this.$parent.reportParam
                if (param) {
                    p.pagingInfo.pageNo = param.pageNo
                    p.pagingInfo.pageSize = param.pageSize
                }

                let res = await this.adModel.adResult(p, this.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    let dd = res.data.campaignProductList
                    param? (this.launchedProduct.data = dd): this.$children[0].injectData(dd)
                }

            },

            //已被废弃: 之前是通过 详情中的接口返回的数据
            injectListData() {
                this.launchedProductCollect = this.$parent.campaignProductList
                this.$children[0].injectData(this.$parent.campaignProductList)
            },

            //获取现有商品列表
            async getExistProduct() {
                let res = await this.adModel.getExistProduct(this.param.query.userId, this.param, this.ctx);
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.tableData = res.data.list
                }

                return res
            },

            setStatusNoticePosition() {
                let key = this.type === 'detail' ? 5 : 4
                let me = this
                setTimeout(() => {
                    let dom = me.$refs.proList.$el,
                        tar = dom.getElementsByTagName('th')[key],
                        left = tar.offsetLeft + (tar.children[0].childNodes[0].length == 3 ? 72 : 56)

                    me.$refs.statusNotice.style = 'display: block;left: ' + left + 'px;'
                }, 100)
            },

            //自动补全小数点, 默认2位
            decimalFill(val, num = 2) {
                (val + '').indexOf('.') === -1 && (val += '.')
                return Number(val).toFixed(num)
            },

            //用于绑定 选择现有商品 中的排序
            sortChange() {
                this.$refs.list.$on('sort-change', (data) => {
                    let info = this.param.orderInfo
                    info.fields = [translate(data.prop)]

                    //如果是status, 则需要互换升降状态
                    data.prop === 'putStatus' && (data.order = data.order === 'ascending'? 'descending': 'ascending')

                    info.type = [translate(data.order)]

                    this.getExistProduct()
                })

                let translate = (key) => {
                    let map = {
                        formattedPrice: 'priceFormatted',
                        createDate: 'createTime',
                        putStatus: 'status',
                        ascending: 'asc',
                        descending: 'desc'
                    }

                    return map[key] || key
                }
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
                if (row.status==2) {
                    return true;
                }else if(row.putStatus==9){
                    return true
                }
            }
        },

        mounted() {
            //this.setStatusNoticePosition()
        },

        components: {
            PageHead,
            TemplateSearchList,
            SimpleList,
            Pay: BIZ.components.pay
        }
    }
</script>
<style lang="less">
    .w880{
        width: 880px;
    }
    .btn-content {
        display: flex;
        justify-content: flex-end;
    }

    .status-notice {
        position: absolute;
        z-index: 2;
        display: none;
        margin-top: 17px !important;
    }

    .status-checkbox {
        width: 110px;
    }

    .showPro-box > .nt-dialog {
        width: 540px;
    }

    .showAddProNotice {
        position: absolute;
        top: 15px;
        left: 116px;
    }

    .pro-info {
        > img {
            width: 80px;
            height: 80px;
            display: block;
            float: left;
            margin-right: 18px;
        }
        > span {
            display: inline-block;
            height: 32px;
            word-break: break-word;
            white-space: normal;
            padding: 8px 0;
            width: 248px;
            vertical-align: top;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .link-img {
            width: 30px;
            vertical-align: -4px;
        }
    }

    .add-product-box-notice {
        margin-bottom: 14px;
        margin-left: 20px;
        color: #57595b;
    }

    .add-product-box-textarea {
        width: 80%;
        margin-right: 8px;
    }

    .add-product {
        > .nt-page-pagination {
            text-align: center;
            background: #f3f3f4;
            padding-top: 24px;
        }
    }

    .nt-popover .popper__arrow.popper_bottom {
        top: -13px;
        border-bottom-color: #d1e5e3;
        left: 90px;
    }

    .hideConfirmCanBtn {
        > .nt-popover {
            .popoverBtn > button:nth-child(2) {
                display: none;
            }
        }
    }

    .mR30 {
        margin-right: 30px;
    }

    .add-ad .operationBox {
        box-shadow: none;
    }

    .d {
        background: url("../../images/default.jpg");
        background-repeat: no-repeat;
    }
</style>
