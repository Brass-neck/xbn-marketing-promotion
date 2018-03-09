<template>
    <template-search-list ref='pageTmpl' title='广告管理' :simple='simpleSearch' :combo='comboSearch'
                          :method='getData'
                          :filter="quickFilter"
                          :suggestion-method="remoteFetch">
        <template slot='page-table-operations'>
            <nt-button @click="_addAd" type="warning">创建广告</nt-button>

            <nt-popover
                    ref="popover1"
                    placement="bottom"
                    width="220"
                    v-model="popModel1">
                <p v-text="popText"></p>
                <nt-button type="primary" size="small" @click="popModel1 = showPop(!0, '_enable')">确定</nt-button>
                <nt-button size="small" v-show="popCancel1" type="primary" @click="popModel1 = showPop(!1, '_enable')">
                    取消
                </nt-button>
            </nt-popover>
            <nt-button type="primary" v-if="!1" @click="checkboxChecked('开启', 1, $event)" v-popover:popover1 class="mL12">开启
            </nt-button>

            <nt-popover
                    ref="popover2"
                    placement="bottom"
                    width="220"
                    v-model="popModel2">
                <p v-text="popText"></p>
                <nt-button type="primary" size="small" @click="popModel2 = showPop(!0, '_close')">确定</nt-button>
                <nt-button size="small" v-show="popCancel2" type="primary" @click="popModel2 = showPop(!1, '_close')">
                    取消
                </nt-button>
            </nt-popover>
            <nt-button type="primary" v-if="!1" @click="checkboxChecked('关闭', 2, $event)" v-popover:popover2 class="mL12">关闭
            </nt-button>

            <nt-popover
                    ref="popover3"
                    placement="bottom"
                    width="220"
                    v-model="popModel3">
                <p v-text="popText"></p>
                <div class="popoverBtn">
                    <nt-button type="primary" size="small" @click="popModel3 = showPop(!0, '_delete')">确定</nt-button>
                    <nt-button size="small" v-show="popCancel3" type="primary"
                               @click="popModel3 = showPop(!1, '_delete')">
                        取消
                    </nt-button>
                </div>
            </nt-popover>
            <nt-button type="primary" @click="checkboxChecked('删除', 3, $event)" v-popover:popover3 class="mL12">删除</nt-button>
            <nt-alert
                    title=""
                    type="error"
                    class="alert-notice"
                    v-show="!balanceEnough">
                <img src="../../images/err-notice.png" class="err-notice">
                <span>您的账户余额不足，已无法正常投放广告，所有广告都已关闭。请尽快充值，以免影响您的投放效果！</span>
                <span @click="showTopUp" class="underline mr35">立即充值</span>
            </nt-alert>
        </template>

        <!-- <template slot='page-table-right-operations'>
            
        </template> -->
        <template slot='page-table' slot-scope='props' class='contentBox'>
            <div class='contentBox' ref="scrollBox">
                <nt-table :data='props.tableData' ref="list" :default-sort='defaultSort' class="border_layout">
                    <nt-table-column type='selection' width="42px" align="center" isChecked="1"></nt-table-column>
                    <nt-table-column
                            prop="campaignName" label="广告名称" min-width="200px" sortable1 show-overflow-tooltip>
                    </nt-table-column>
                    <nt-table-column
                            prop="salesCountry" label="投放国家" min-width="80px" sortable1>
                    </nt-table-column>
                    <nt-table-column label="商品总数/通过数/失败数" min-width="160px">
                        <template slot-scope="scope">
                            <label v-for="(i, j) in scope.row.productStatus">
                                    <span v-if="j != 2">{{i}}/</span>
                                    <span v-else class="c_red">{{i}}</span>
                                </label>
                        </template>
                    </nt-table-column>
                    <nt-table-column
                            prop="budget" label="每天预算" min-width="120" sortable="!1">
                        <template slot-scope="scope" slot="append">
                            <nt-tooltip class="" effect="dark" content="Top Center" placement="top">
                                <div slot="content">每日预算是指您每天愿意为此广告系列支付的平均金额。<br/>
                                    实际每日支出：您的每日支出会上下波动，例如，为了让您的广告系列充分发挥潜力，您的每日支出可能会比每日预算额度超出20%。<br/>
                                    月度费用限额：如果您在整个月中的每日预算为￥100.00，那么您每月支付的费用不会超过￥3040.00（即每日预算￥100.00*每月平均天数 30.4）。
                                </div>
                                <i class="col_f8ac59 ml20 nt-icon-xbn-19" ref="budgetNotice"></i>
                            </nt-tooltip>
                        </template>
                        <template slot-scope="scope">
                            <div>
                                <div v-show="!scope.row._show" class="operate-box">
                                    <span>{{scope.row.budget | toFiexd}}</span>
                                    <span>元</span>
                                    <a href="javascript:void(0);" class="modifyBudget main_color mL10"
                                       @click="showModify(scope.row, $event)">修改</a>
                                </div>
                                <div v-show="scope.row._show" class="operate-box">
                                    <!--<nt-input v-model="scope.row.budget" ref="inp" type="number" maxlength="13" placeholder="" @change="inUpdata(scope.row)" class="w80" size="tiny"></nt-input>-->
                                    <input type="text" maxlength="13" v-model="scope.row.budget"
                                           class="custom" @keyup="inUpdata(scope.row)">
                                    <span>元</span>
                                    <a href="javascript:void(0);" @click="modifyBudget(scope.row)"
                                       class="mL16 main_color">保存</a>
                                    <a href="javascript:void(0);" @click="modifyBudget(scope.row, 'cancle')"
                                       class="main_color mL5">取消</a>
                                </div>
                            </div>
                        </template>
                    </nt-table-column>
                    <nt-table-column
                            prop="createTime" label="创建时间" min-width="160" sortable>
                    </nt-table-column>
                    <nt-table-column
                            prop="status"
                            :default-sort="{prop: 'status', order: 'descending'}" label="状态" min-width="100" sortable1>
                        <template slot-scope="scope">
                            <div class="operate-box" @click="switchP($event)">
                                <nt-switch v-model="scope.row.status === '0'? true: false"
                                           on-text=""
                                           off-text=""
                                           :on-color="switchColor.on"
                                           :off-color="switchColor.off"
                                           :width="40"
                                           @change="statusChange(scope.row, $event)">
                                </nt-switch>
                            </div>
                        </template>
                    </nt-table-column>
                    <nt-table-column
                            label="操作" width="150" align="center">
                        <template slot-scope="scope">
                            <div class="operate-box">
                                <a href="javascript:void(0);" class="main_color" @click="_detail(scope.row, $event)">详情</a>
                                <a href="javascript:void(0);" class="main_color mL10" @click="deleteP($event, scope.row)">删除</a>
                                <!-- <nt-tooltip class="item opera_btn vM" effect="dark" content="详情" placement="top">
                                    <a href="javascript:void(0);" @click="_detail(scope.row, $event)"><i
                                            class="nt-icon-xbn-12 f18"></i></a>
                                </nt-tooltip>
                                <nt-tooltip class="item opera_btn vM" content="删除" placement="top">
                                    <a class="" href="javascript:void(0);" @click="deleteP($event, scope.row)"><i
                                            class="nt-icon-xbn-13 f18"></i></a>
                                </nt-tooltip> -->
                            </div>
                        </template>
                    </nt-table-column>
                    <template slot="empty" slot-scope="props">
                        您还没有任何广告
                    </template>
                </nt-table>
                <nt-popover placement="right" width="400" ref="budgetNoticePop" trigger="hover">
                    <div slot="content" v-html="noticeAdd2" style="width: 260px;"></div>
                </nt-popover>
                <i class="col_f8ac59 mL10 budget-notice nt-icon-xbn-19" ref="budgetNotice"
                   v-popover:budgetNoticePop></i>
            </div>
            <template>
                <nt-dialog
                        title="线上充值"
                        class="dialog-width-auto"
                        :visible.sync="showPay">
                    <pay :cancelFun="payCancle" :sucCallBack="paySuccess" :errorCallBack="payErr"
                         :payConfig="payConfig">
                        <span slot="content" class="vT">
                            <span>元</span>
                            <nt-tooltip class="item opera_btn vM" effect="dark" content="详情" placement="top">
                                <span slot="content" v-text="noticeAdd8"></span>
                                <i class="nt-icon-xbn-19 col_f8ac59 f16 vM-2 mL10"></i>
                            </nt-tooltip>
                        </span>
                    </pay>
                </nt-dialog>
            </template>
        </template>
    </template-search-list>
</template>

<script type="text/javascript">
    import {TemplateSearchList} from 'xbn-biz-components'
    import STATUSCODE from '../../config/statusCode'
    import CONSTANTS from '../../config/adStrategy/const'
    import BIZ from 'xbn-biz-common'

    export default {
        props: {
            simpleSearch: [],

            comboSearch: []
        },

        data() {
            return {
                budgetNoticeCon: CONSTANTS.notice.budgetNoticeCon,
                switchColor: CONSTANTS.switchColor,
                adStatus: CONSTANTS.adStatus,
                noticeAdd2: CONSTANTS.notice.noticeAdd2,
                noticeAdd8: CONSTANTS.notice.noticeAdd8,
                popModel: !1,
                popModel1: !1,
                popModel2: !1,
                popModel3: !1,
                popModel4: !1,
                popText: '请选择广告',
                popCancel1: false,
                popCancel2: false,
                popCancel3: false,
                popModelPub: {
                    show: !1,
                    text: '',
                    invoke: '',
                    row: null
                },
                currPageNo: 1,
                payConfig: {},
                showPay: !1,
                defaultSort: {
                    prop: 'createTime',
                    order: 'descending'
                },
                selectionByPage: [null],//这是一个用于存放所有选中的容器, 根据页面做区分相, 第一个带上默认null, 因为是pageNo都是从1开始
                selectedList: null, //这是与上一个对应的List, 不区分pageNo 的所有选中的 广告
                currentSwitchEve: null,
                listParam: null, //用于存放list中的param
                balanceEnough: !0,
                adModel: this.ctx.models.MarketingModel.ad,
                payModel: this.ctx.models.MarketingModel.pay,
                balance: null,
                adOpenFlag: !0,//是否可以开启广告，依赖于余额
                istatus: null,
                quickFilter: [
                    {
                        'key': 'status',
                        'label': '广告状态',
                        'size': 'small',
                        'options': [
                            {'id': 1, 'value': null, 'label': '全部'},
                            {'id': 2, 'value': 1, 'label': '已关闭'},
                            {'id': 3, 'value': 0, 'label': '已开启'}
                        ]
                    },
                    {
                        'key': 'createDateNum',
                        'label': '创建时间',
                        'size': 'small',
                        'options': [
                            {'id': 1, 'value': null, 'label': '全部'},
                            {'id': 1, 'value': 3, 'label': '近3天'},
                            {'id': 2, 'value': 7, 'label': '近7天'},
                            {'id': 3, 'value': 15, 'label': '近15天'},
                            {'id': 4, 'value': 30, 'label': '近1月'}
                        ]
                    }
                ],
            }
        },

        created: function () {
//            this.$nextTick(function () {
////                this.crates(' 店铺信息');
//                let oinfod = document.querySelector('.infod');
//                oinfod.addEventListener('click',()=> {
//                    this.$router.push('/storeInfo')
//                })
//            })
        },
        methods: {
            payCancle() {
                this.showPay = !1
            },

            paySuccess(info) {
                this.$message({
                    message: '充值成功',
                    type: 'success',
                    showClose: true
                })
                this.showPay = !1
            },

            payErr(info) {
                this.$message({
                    message: '服务出错，请联系客服'
                })
                this.showPay = !1
            },

            async getData(param = {pageNo: 1, pageSize: 10}) {
                if (param.orderParam) {
                    let order = param.orderParam[0].orderBy === 'budget' ? `(budget+0)` : param.orderParam[0].orderBy
                    param.orderInfo = {
                        fields: [order],
                        type: [param.orderParam[0].ascOrDesc]
                    }
                }
                
                delete param.orderParam
                param.query = param.param
                delete param.param
                param.query.userId = 1
                let data = await this.adModel.getAdList(param, this.ctx)
                this.data = data.data.list
                this.data.forEach(i => {
                    i._show = !1
                    i.oldBudget = i.budget,
                        i.budget = parseFloat(i.budget)//预算在进行排序时，需要转换成Number
                })

//                翻页勾选保留
//                setTimeout(() => {
//                    this.addSelected(data.data.list, param.pageNo)
//                    //this.$refs.list.toggleRowSelection(data.data.list[1])
//                }, 50)
                return data
                //return this.addSelected(data, param.pageNo)
            },

            addSelected(list, i) {
                this.currPageNo = i
                let sele = this.removeDepeat()
                //let sele = this.$refs.list.selection//this.selectionByPage[i]
                //加了 reserveSelection 的table 需要去重
                if (sele) {
                    sele.forEach(ii => {
                        list.forEach(jj => {
                            if (ii.id == jj.id) {
                                this.$refs.list.toggleRowSelection(jj)
                                return
                            }
                        })
                    })
                }
                //this.selectionByPage[i] = this.$refs.list.selection
            },

            removeDepeat() {
                let s = this.$refs.list.selection,
                    n = []

                if (s && s.length) {
                    s.forEach(i => {
                        let repeated = !1
                        n.forEach(j => {
                            if (i.id == j.id) {
                                repeated = !0
                                return
                            }
                        })
                        !repeated && n.push(i)
                    })
                }
                return n
            },

            selectable(row) {
                return !row._selected
            },

            remoteFetch: function (query, callback) {
                setTimeout(function () {
                    callback([
                        {'value': '三全鲜食（北新泾店）'},
                        {'value': 'Hot honey 首尔炸鸡（仙霞路）'}
                    ]);
                }, 1000);
            },

            _addAd() {
                this.$router.push('/ad-strategy/add')
            },

            _topup() {
                this.showPay = !0
            },

            async _enable(selection = this.$refs.list.selection) {
                if (await this.openAdCheck(selection)) return

                if (!selection.length) {
                    this.$refs.list.clearSelection()
                    this.$message({
                        message: '没有可开启选项',
                        showClose: !0
                    })
                    return
                }
                //if (this.balance.vailableBalance/* > need*/) {
                if (this.adOpenFlag) {
                    let param = []
                    selection.forEach(item => {
                        param.push(item.campaignId)
                    })
                    let res = await this.adModel.openAd(param, this.ctx)
                    if (res.statusCode == STATUSCODE.SUCCESS) {
                        selection.forEach(i => {
                            i.status = '0'
                        })
                    } else {
                        this.$alert()
                    }
                    this.$refs.list.clearSelection()
                } else {
                    /*this.$confirm(`您的账户余额只有${this.balance.vailableBalance}， 请充值`, '', {
                        confirmButtonText: '去充值',
                        cancelButtonText: '取消',
                    }).then(() => {
                        this.showPay = !0
                    })*/
                    this.popModelPub = {
                        show: !0,
                        text: `您的账户余额不足，请先充值。`,
                        invoke: '_topup'
                    }
                    this.setPopPubPosition(this.currentSwitchEve)
                    setTimeout(() => {
                        let pops = document.getElementsByClassName('nt-popover'),
                            pop = pops[pops.length - 1]

                        let c = pop.getElementsByTagName('button')
                        c[0].children[0].innerText = '去充值'
                        c[1].children[0].innerText = '稍后再说'
                    }, 50)
                }
            },

            async _close(selection = this.$refs.list.selection) {
                let param = [],
                    len = 0
                selection.forEach(item => {
                    item.status === '0' && len++
                    param.push(item.campaignId)
                })
                this.$refs.list.clearSelection()
                if (!len) {
                    this.$message({
                        message: '没有可关闭选项',
                        showClose: !0
                    })
                    return
                }
                let res = await this.adModel.closeAd(param, this.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    selection.forEach(i => {
                        i.status = '1'
                    })
                } else {
                    this.$alert()
                }
            },

            async openAdCheck(selection) {
                let param = []
                selection.forEach(i => {
                    param.push({
                        budget: selection[0].budget,
                        campaignId: selection[0].campaignId,
                        userId: 1
                    })
                })
                let res = await this.adModel.adOpenCheck(param[0], this.ctx)

                let flag = false
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.adOpenFlag = res.data[0] == 1 ? !0 : !1
                } else {
                    flag = !0
                    this.$alert('余额检查出错，请联系客服')
                }

                return flag
            },

            async payInfo() {
                let res1 = await this.adModel.allAdBudget(1, this.ctx)
                if (res1.data) {
                    //this.balanceEnough = this.balance.totalBalance > res.data ? !0 : !1
                    let res = await this.adModel.budgetSupported(res1.data[0], this.ctx)
                    if (res.statusCode == STATUSCODE.SUCCESS) {
                        this.balanceEnough = !!res.data[0]
                    } else {
                        this.$alert('出错了')
                    }
                }
            },

            async payInfo1() {
                let res = await this.payModel.getPayInfo(1, this.ctx)
                this.balance = res.data
                this.checkBalance()
            },

            async checkBalance() {
                let res = await this.adModel.allAdBudget(1, this.ctx)
                if (res.data) {
                    this.balanceEnough = this.balance.totalBalance > res.data ? !0 : !1
                }
            },

            showTopUp() {
                this.showPay = !0
            },

            async _detail(row, eve) {
                if (await this.isOperating(row, eve)) return
                this.$router.push('/ad-strategy/detail/' + row.campaignId + '?s=' + row.status)
            },

            async checkboxChecked(operate, ii, eve) {
                let selection = this.removeDepeat()//this.$refs.list.selection
                /*this.selectionByPage.forEach(i => {
                    i && i.length && (selection = selection.concat(i))
                })*/
                if (selection.length) {
                    this.selectedList = selection
                    if (await this.isOperating(selection, eve)){
                        setTimeout(i => {
                            this['popModel' + ii] = !1
                        }, 0)
                        return
                    }
                    this.popText = `您确定要${operate}所选广告吗？`
                    this['popCancel' + ii] = true
                } else {
                    this.selectedList = []
                    this.popText = `请选择广告`
                    this['popCancel' + ii] = false
                }
            },

            async statusChange(row, flag) {
                this.popModelPub = {
                    show: !0,
                    row: row
                }
                //开启: 去判断是否资金充足
                if (flag) {
                    this.popModelPub.text = '您确定要开启所选广告吗？'
                    this.popModelPub.invoke = '_enable'
                    //关闭: 提示是否真关闭
                } else {
                    this.popModelPub.text = '您确定要关闭所选广告吗？'
                    this.popModelPub.invoke = '_close'
                }

                /**
                 * 状态改变时，会影响之前的 selection 和 selectionByPage 的绑定关系，所以得需要重新绑定
                 * 按理说不应该改变 switch 改变时，不应该改变selection 状态的
                 */
                //this.selectionByPage[this.currPageNo] = this.$refs.list.selection
            },

            switchP(eve) {
                //这里会触发两次
                if (eve.target.tagName === 'INPUT') return
                setTimeout(async () => {
                    this.currentSwitchEve = eve
                    if (await this.isOperating(this.popModelPub.row, eve)) return
                    this.setPopPubPosition(eve)
                }, 50)
            },

            showPop(flag, cb, data) {
                let s = this.selectedList
                if (s && s.length) {
                    flag && this[cb](s)
                }
                return !1
            },

            popPublic() {
                this[this.popModelPub.invoke]([this.popModelPub.row])
                return false
            },

            //检查该列表是否处于 中间态
            async isOperating(row, eve) {
                //这里的 row 有可能是 一条或多条
                let flag = !1,
                    msg  = '',
                    ref  = CONSTANTS.adOperating

                if (row instanceof Array) {
                    //方案一：不断循环查找详情，并匹配
                    //方案二：拿取所有列表数据，并匹配
                    let param = {
                        orderInfo: {fields: ["createTime"], type: ["desc"]},
                        pageNo: 1, 
                        pageSize: 10e5,
                        query: {
                            userId: 1
                        }
                    }

                    row.forEach(i => {
                        if (i.status && 'ABCD'.indexOf(i.status) > -1) {
                            msg = ref[i.status]
                            return
                        }
                    })
                    /*let data = await this.adModel.getAdList(param, this.ctx)
                    data.data.list.forEach(i => {
                        if (i.status && 'ABCD'.indexOf(i.status) > -1) {
                            let ok = !1
                            row.forEach(j => {
                                if (i.id == j.id) {
                                    msg = ref[i.status]
                                    ok = !0
                                    return
                                }
                            })
                            if (ok) return
                        }
                    })*/
                } else {
                    //在做请求之前 需要检查一下 status 中是否含有 中间态
                    if (!row.campaignId && 'ABCD'.indexOf(row.status) > -1) {
                        msg = ref[row.status]
                        setTimeout(() => {
                            location.reload()
                        }, 800)
                    } else {
                        let res = await this.adModel.adDetail(row.campaignId, this.ctx)
                        msg = ref[res.data[0].status]
                    }
                }
                
                /*if (msg) {
                    flag = !0
                    this.$message({message: `正在${msg}广告，请稍后再试！`, type: 'warning'})
                    setTimeout(ii => {
                        this.getData()
                    }, 50)
                }*/
                msg && (flag = !0, this.$message({message: `正在${msg}广告，请稍后再试！`, type: 'warning'}))
                return flag
            },

            async deleteP(eve, row) {
                if (await this.isOperating(row, eve)) return
                this.popModelPub = {
                    show: !0,
                    text: '您确定要删除所选广告吗？',
                    invoke: '_delete',
                    row: row
                }
                this.setPopPubPosition(eve)
            },

            async setPopPubPosition(eve) {

                await this.$popconfirm(eve.target, this.popModelPub.text)
                this[this.popModelPub.invoke]([this.popModelPub.row])
                //this.$refs.popPublic.$el.children[0].style = 'position:fixed;left:' + (eve.clientX - 60) + 'px;top: ' + (eve.clientY + 10) + 'px;height:20px;'
            },

            async _delete(selection = this.$refs.list.selection) {
                let data = []
                selection.forEach((item) => {
                    data.push(item.campaignId)
                })
                let res = await this.adModel.deleteAd(data, this.ctx)
                //res.statusCode == STATUSCODE.SUCCESS? this.getData(): this.$alert('something wrong')
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.$message({message: '删除成功', showClose: true, type: 'success'});
                    this.$refs.pageTmpl.refreshData();
                    this.$refs.list.clearSelection()
                } else {
                    this.$message({message: '删除失败', showClose: true, type: 'error'});
                }
            },

            async showModify(row, eve) {
                if (await this.isOperating(row, eve)) return
                row._show = !0
            },

            async modifyBudget(row, cancle) {
                if (cancle) {
                    row.budget = row.oldBudget;
                } else {
                    let data = {
                        budget: row.budget,
                        campaignId: row.campaignId,
                        budgetId: row.budgetId,
                        userId: 1
                    };
                    if (row.budget <= 0) return false;
                    let res = await this.ctx.models.MarketingModel.ad.modifyBudget(data, this.ctx)
                    if (res.statusCode == STATUSCODE.SUCCESS) {
                        row.oldBudget = row.budget
                        this.$message({
                            message: '保存成功，广告投放将于次日生效。',
                            type: 'success',
                            showClose: !0
                        });
                    } else {
                        row.budget = row.oldBudget
                        this.$alert('服务出错，请联系客服', {})
                    }
                }
                row._show = !1
            },

            setBudgetNoticePosition() {
                let me = this
                setTimeout(() => {
                    let dom = me.$refs.list.$el,
                        tar = dom.getElementsByTagName('th')[3],
                        left = tar.offsetLeft + 100

                    me.$refs.budgetNotice.style = 'display: block;left: ' + left + 'px;'
                }, 200)
            },

            //获取点击时的事件源，并暴露到全局变量
            clickPosition() {
                window.onclick = (eve) => {
                    let type = ['BUTTON', 'A'],
                        deep = 3,
                        tar = eve.target

                    while (deep--) {
                        if (type.indexOf(tar.tagName) !== -1) {
                            window.clickSourceEvent = {
                                left: tar.offsetLeft,
                                top: tar.offsetTop + tar.offsetHeight
                            }
                        } else {
                            tar = tar.parentElement
                        }
                    }
                }
            },

            setScrollBoxHeight() {
                let height = document.body.offsetHeight - 300,
                    box = this.$refs.scrollBox
                if (box) {
                    let body = box.getElementsByClassName('nt-table__body-wrapper')[0]
                    if (body && height < (body.children[0].clientHeight + 20)) {
                        body.style.height = height + 'px'
                        body.className.indexOf('scrollY') === -1 && (body.className = body.className + ' scrollY')
                    } else {
                        body.className = body.className.replace('scrollY', '')
                    }
                }
            },
            inUpdata(row) {
                let _val = row.budget;
                let s1 = /\^|\@|\#|\$|\%|\&|\!|\*|[a-zA-Z]|[\u4e00-\u9fa5]|;|:|'|"|\/|\?/.test(_val);
                clearTimeout(this.istatus);
                this.istatus = setTimeout(() => {
                    if (s1) {
                        row.budget = ''
                    } else if (_val.indexOf('.') != -1) {
                        let s = _val.split('.');
                        let s0 = s[0].length;
                        let s1 = s[1].length;
                        if (s1 > 2 || s0 > 10 || s[0] == '') {
                            row.budget = ''
                        }
                    } else if (_val.length > 10 || _val.length == 1 && _val.charAt(0) == 0) {
                        row.budget = ''
                    }
                }, 500)
            }
        },

        components: {
            TemplateSearchList,
            Pay: BIZ.components.pay
        },

        mounted() {
            //this.setBudgetNoticePosition()
            this.payInfo()
            //this.clickPosition()
            //this.setScrollBoxHeight()
            //window.addEventListener('resize', this.setScrollBoxHeight)
        },

        filters: {
            toFiexd(val) {
                return /\./.test(val) ? Number(val).toFixed(2) : Number(val + '.').toFixed(2)
            }
        }
    }
</script>

<style type="text/css" lang="less">
    .tiny-input {
        width: auto;
        > input {
            width: 80px;
            height: 18px;
            font-size: 13px;
            padding: 0 3px;
        }
    }
    .budget-notice {
        position: absolute;
        display: none;
        top: 41px;
        z-index: 2;
    }

    .err-notice {
        vertical-align: -3px;
        width: 16px;
        margin-right: 6px;
    }

    .mL12 {
        margin-left: 12px;
    }


    .custom {
        width: 80px;
        height: 18px;
        font-size: 13px;
        padding: 0 3px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .custom:focus {
        outline: none;
        border-color: #2ba3e7;
    }

    .nt-table__body-wrapper table tbody tr td {
        height: 47px;
    }
    .marketing-main{
        .nt-page-pagination .nt-pagination{
            background: #f3f3f3;
        }
    }
    .c_red {
        color: #fb0505;
    }
</style>