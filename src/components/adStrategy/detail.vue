<template>
    
    <div class="add-ad">
        <page-head title="广告管理" ref="head"></page-head>
        <div class="operationBox" ref="operBox" :class="{'top-fixed': oprFixed}">
            <div class="nt-row">
                <div class="nt-col nt-col-12"><a href="javascript:;" @click="back" class="col_57595b f16"><i
                        class="nt-icon-arrow-left f14 mR10" title="返回"></i>广告详情</a>
                </div>
            </div>
        </div>
        <div class="operationBox" :style="{display: oprFixed? 'block':'none'}"></div>
        <div class="contentBox" ref="addAdBox" v-loading.fullscreen.lock="!0">
            <div class="mark">
                <span>广告编号：{{model.adNumber}}</span>
                <span style="float: right">广告状态：{{model.status === '0'?'已开启':'已关闭'}}</span>
            </div>
            <div  class="border_layout competing_infor">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">基本信息</div>
                </div>
                <template>
                    <div class="competing_infor_main">
                        <nt-row class="mB15">
                            <nt-col :span="6"><span class="w100 tR inline_block">广告名称：</span><span v-text="model.campaignName"></span></nt-col>
                            <nt-col :span="6"><span class="w100 tR inline_block">投放国家：</span><span>美国</span><!-- <span v-text="model.salesCountry"></span> --></nt-col>
                            <nt-col :span="6"><span class="w100 tR inline_block">创建时间：</span><span v-text="model.createTime"></span></nt-col>
                            <!--<nt-col :span="6"><span class="w100 tR inline_block">广告编号：</span><span v-text="model.adNumber"></span></nt-col>-->
                        </nt-row>
                        <nt-row>
                            <nt-col :span="6"><span class="w100 tR inline_block">每天预算：</span><span v-text="model.budget"></span><span>&nbsp;元</span></nt-col>
                            <!--<nt-col :span="6">-->
                                <!--<span class="w100 tR inline_block">状态：</span>-->
                                <!--<nt-switch v-model="model.status === '0'? true: false"-->
                                           <!--on-text=""-->
                                           <!--off-text=""-->
                                           <!--class="curdefault"-->
                                <!--&gt;</nt-switch>-->
                            <!--</nt-col>-->
                            <nt-col :span="6"><span class="w100 tR inline_block">累计花费总额：</span><span v-text="model.allost"></span><span>&nbsp;元</span></nt-col>
                        </nt-row>
                    </div>
                </template>
            </div>
            <div class="competing_infor mT20">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">广告投放效果</div>
                </div>
                <div class="operationBox competing_infor_main">
                    <span>投放时间：</span>
                    <nt-button type="primary" @click="checkDate(0)" v-if="!1" :class="isDateSelected(0)">今天
                    </nt-button><nt-button type="ghost" @click="checkDate(1)" :class="isDateSelected(1)">7天
                    </nt-button><nt-button type="ghost" @click="checkDate(2)" :class="isDateSelected(2)">14天
                    </nt-button><nt-button type="ghost" @click="checkDate(3)" :class="isDateSelected(3)">30天
                    </nt-button><nt-button type="primary" @click="checkDate(4)" v-if="!1" :class="isDateSelected(4)">自定义时间</nt-button>
                    <div class="date-picker" v-show="customDate">
                        <nt-date-picker 
                                v-model="model.beginDate" 
                                type="date" 
                                placeholder="选择开始日期">
                        </nt-date-picker>
                        <nt-date-picker 
                                v-model="model.endDate" 
                                type="date" 
                                placeholder="选择结束日期">
                        </nt-date-picker>
                    </div>
                </div>
                <div class="chart-sep"></div>
                <ul class="chart-switch">
                    <li v-for="(item, i) in chartItems" :class="isSelected(i)" @click="switchChart(i, item)">
                        <p>
                            <span v-text="item.name"></span>
                            <nt-tooltip placement="top" width="400" trigger="hover" :content="getNoticeDet(i)">
                                <div slot="content" v-text="getNoticeDet(i)"></div>
                                <i class="col_f8ac59 nt-icon-xbn-19"></i>
                            </nt-tooltip>
                        </p>
                        <span v-text="item.value"></span>
                    </li>
                </ul>
                <template>
                    <!-- <ve-line :data="chartData" :settings="chartSetting"></ve-line> -->
                    <div id="chartDiv"></div>
                    <div v-if="noChartData" class="noChartData">
                        您还没有广告投放数据!
                    </div>
                </template>
            </div>
            <div class="border_layout competing_infor mT20">
                <div class="competing_infor_title nt-row">
                    <div class="fb nt-col nt-col-24">投放商品信息</div>
                </div>
                <ad-pro :adId="adId" type="detail"></ad-pro>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    import {PageHead, TemplateSearchList} from 'xbn-biz-components'
    import SimpleList from '../common/list.vue'
    import AdPro from './_pro.vue'
    import CONSTANTS from '../../config/adStrategy/const'
    //import VeLine from 'v-charts/lib/line'
    import Highcharts from 'highcharts'
    import STATUSCODE from '../../config/statusCode'

    export default {
        props: {

        },

        data() {
            let adId = this.$route.params[0],
                status = this.$route.query.s
            return {
                oprFixed: false,
                model: {

                },
                product: {
                    country: 'am'
                },
                showAddPro: !1,
                showChoosePro: !1,
                addedProduct: [],
                customDate: !1,
                adModel: this.ctx.models.MarketingModel.ad,
                switchColor: CONSTANTS.switchColor,
                chartData: {},
                adId: adId,
                chartSetting: {
                    lineStyle: {
                        normal: {
                            color: '#2ba3e7'
                        }
                    },
                    //metrics: ['']
                },
                selectedChartItem: '0',
                chartItems: [{
                    name: '曝光量',
                    value: '',
                    type: 'impressions'
                }, {
                    name: '点击量',
                    value: ' ',
                    type: 'clicks'
                }, {
                    name: '平均点击单价',
                    value: ' ',
                    type: 'averageCpc'
                }, {
                    name: '花费总额',
                    value: ' ',
                    type: 'cost'
                }, {
                    name: '销售总额',
                    value: ' ',
                    type: 'earnings'
                }],
                noChartData: !1,
                loadAdInfo: !0,
                adStatus: status,
                decimalNum: 0,
                isDollor: !1,//图表中是否带$
                reportParam: {
                    campaignId: adId,
                    dateRangeType: 1,
                    pagingInfo: {
                        query: {
                            campaginId: adId,
                            isDelete: '0'
                        },
                        pageNo: 1,
                        pageSize: 10,
                    }
                }
            }
        },

        methods: {
            async getData() {
                let res = await this.adModel.adDetail(this.adId, this.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.model = res.data[0]
                    this.model.budget = this.decimalFill(this.model.budget)
                    //this.model.createTime += ':00'
                    //this.adStatus = this.model.status
                }

                //消费总额 由于速度慢
                let res1 = await this.adModel.totalConsumption(this.adId, this.ctx)
                if (res1.statusCode == STATUSCODE.SUCCESS) {
                    this.model.allost = this.decimalFill(res1.data[0].allost)
                }
            },

            //自动补全小数点, 默认2位
            decimalFill(val, num = 2) {
                (val + '').indexOf('.') === -1 && (val += '.')
                return Number(val).toFixed(num)
            },

            back() {
                this.$router.back()//.replace('/ad-strategy')
            },

            getNoticeDet(i) {
                return CONSTANTS.notice['noticeDet' + (++i)]
            },

            checkDate(date) {
                this.reportParam.dateRangeType = date
                this.getReportData()
            },
            
            showExitProduct() {
                this.showChoosePro = !0
            },

            showAddProduct() {
                this.showAddPro = !0
            },

            chooseProduct() {
                this.addedProduct = this.$refs.addedProductList.selected
                this.showChoosePro = !1
                this.$refs.addProList.refreshData()
            },

            addProduct() {
                this.$refs.productForm.validate((valid) => {
                    if (valid) {
                        let data = {

                        },
                        res = this.ctx.models.MarketingModel.ad.addProduct(data)
                    }
                })
            },

            isDateSelected(i) {
                return this.reportParam.dateRangeType == i? 'active': ''
            },

            isSelected(i) {
                return this.selectedChartItem == i? 'active': ''
            },

            switchChart(index, item) {
                this.selectedChartItem = index
                this.setChartData(item.type)
            },

            async getReportData() {
                let res = await this.adModel.adResult(this.reportParam, this.ctx)
                if (res.statusCode == STATUSCODE.SUCCESS) {
                    this.reportData = res.data

                    this.setChartData()
                    /**
                    *   早期做的时候是把下面的 商品抽出来的,
                    *   但接口是和图表一起来的，
                    *   接口调完后，将数据传给 商品 并插入
                    *   现在换种方案：
                    *   详情 和 商品
                    *   的数据自己调，拿取各自所需的部分
                    */
                    this.addLuanchedData()
                    this.setChartItem()
                } else {

                }
                
            },

            //添加图标的数据
            setChartData() {
                let ItemData   = this.reportData.customerReportList,
                    addDecimal = ['cost', 'earnings', 'averageCpc'],
                    columns    = ['date', 'num'],
                    rows = [],
                    date = [],
                    data = [],
                    item = null

                if (!ItemData) return
                ItemData.forEach(i => {
                    rows.push({
                        date: i.reportDate,//.replace(/-/g, '.'),
                        num:  i[this.chartItems[this.selectedChartItem].type]
                    })
                    date.push(i.reportDate.replace(/-/g, '.'))
                    item = this.chartItems[this.selectedChartItem]

                    this.decimalNum = addDecimal.indexOf(item.type) > -1? 2: 0
                    this.isDollor   = !(item.type === 'earnings'? 0: 1)
                    data.push(i[item.type])
                })

                this.chartData = {
                    //columns: columns,
                    //rows: rows,
                    date: date,
                    data: data,
                    item: item
                }

                this.addCharts()
            },

            //添加图片下方的列表
            addLuanchedData() {
                this.campaignProductList = this.reportData.campaignProductList
                this.$children.every(i => {
                    let flag = true
                    if (i.$vnode.tag.indexOf('ad-pro') > -1) {
                        i.injectListData()
                        flag = false
                    }
                    return flag
                })
            },

            setChartItem() {
                let dd = this.reportData.customerReport
                if (!dd) {
                    this.noChartData = !0
                    return
                }
                this.chartItems = [{
                        name: '曝光量',
                        value: dd.impressions,
                        type: 'impressions'
                    }, {
                        name: '点击量',
                        value: dd.clicks,
                        type: 'clicks'
                    }, {
                        name: '平均点击单价',
                        value: this.decimalFill(dd.averageCpc) + '元',
                        type: 'averageCpc'
                    }, {
                        name: '花费总额',
                        value: this.decimalFill(dd.cost) + '元',
                        type: 'cost'
                    }, {
                        name: '销售总额',
                        value: this.decimalFill(dd.earnings) + '美元',
                        type: 'earnings'
                    }]
            },

            setScrollBoxHeight() {
                let height = document.body.offsetHeight - 3 - 120 - 50
                this.$refs.addAdBox && (this.$refs.addAdBox.style.height = height + 'px')
            },

            getTooltip() {
                let y = this.decimalNum? this.isDollor? '${point.y}': '{point.y}元': '{point.y}'
                let html = [
                    '<span style="fill:#2ba3e7" x="8" dy="15">●</span>',
                    '<span dx="0"> {series.name}: </span>',
                    `<span style="font-weight:bold" dx="0">${y}</span>`
                ].join('')

                return html
            },

            getTooltip2(tar) {
                var html = ''

                //tar.point.forEach(function (item) {
                    let y = this.decimalNum? this.isDollor? tar.y + '美元': tar.y + '元': tar.y

                    html += [
                        tar.x +'<br>',
                        '<span style="fill:#2ba3e7" x="8" dy="15">●</span>',
                        '<span dx="0"> '+ tar.series.name +': </span>',
                        '<span style="font-weight:bold" dx="0">'+ y +'</span>'
                    ].join('')

                //})
                
                return html
            },

            addCharts() {
                var me = this
                Highcharts.chart('chartDiv', {
                    title: {
                        text: ''
                    },

                    credits: {
                        enabled:false //去除版权信息
                    },

                    xAxis: {
                        categories: this.chartData.date,
                        gridLineWidth: 1
                    },
                    
                    tooltip: {
                        valueDecimals: this.decimalNum,
                        formatter() {
                            return me.getTooltip2(this)
                        }
                        //pointFormat: this.getTooltip()//'<span style="font-size: 10px">{point.y}.00</span><br/>'
                    },

                    legend: false,

                    yAxis: {
                        title: '',
                        tickPixelInterval: 36
                    },

                    series: [
                        {
                            name: this.chartData.item.name,
                            data: this.chartData.data,
                            color: '#2ba3e7'
                        }
                    ]

                });
            },
            /**
             * 处理滚动时，保持操作栏位于页面顶端 (会消失的情形下)
             **/
            handleScroll: function() {
                //获取页面头的高度
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > this.$refs.operBox.offsetHeight) {
                    this.oprFixed = true;
                } else {
                    this.oprFixed = false;
                }
            }
            
        },

        mounted() {
            //this.setScrollBoxHeight()
            //window.addEventListener('resize', this.setScrollBoxHeight)
            document.addEventListener('scroll',this.handleScroll)
        },

        destroyed() {
            document.removeEventListener('scroll',this.handleScroll)
        },

        created() {
            this.getData()
            this.getReportData()
        },
  
        computed: {

        },

        components: {
            PageHead,
            TemplateSearchList,
            SimpleList,
            AdPro,
            //VeLine
        }
    }
</script>

<style type="text/css" lang="less">
    @import '../../style/props';

    .add-base-info {
        > .nt-row {
            margin-bottom: 8px;
            > .nt-col {
                > span:first-child {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    margin-right: 16px;
                }
            }
        }
    }
    .marketing-main {
        .ad-date-box {
            button {
                background-color: #fff;
                color: @c_green;
                &.active {
                    background-color: @c_green;
                    color: #fefeff;
                }
            }
        }
    }
    .date-picker {
        display: inline-block;
        vertical-align: middle;
        > .nt-date-editor {
            width: 140px;
        }
    }
    .chart-switch {
        height: 70px;
        line-height: 49px;
        padding-left: 60px;
        font-weight: bold;
        border-bottom: 3px solid #e7eaec;
        color: #a9a6a6;
        > li {
            float: left;
            width: 140px;
            height: 68px;
            text-align: center;
            cursor: pointer;
            &.active {
                border-bottom: 3px solid @c_yellow;
                color: #666;
            }
            &:hover {
                color: #666;
            }
            > p {
                margin-bottom: -30px;
            }
        }
        .notice {
            margin-right: -20px;
        }
    }
    .chart-sep {
        height: 4px;
        background-color: #f3f3f4;
        /*width: 105%;*/
        margin-left: -36px;
    }
    .ad-date-box {
        margin-bottom: 8px;
    }
    .w100{
        width: 100px;
    }
    .curdefault{
        cursor: default;
        .nt-switch__label{
            cursor: default;
        }
    }
    .operationBox {
        &.top-fixed {
            position: fixed;
            z-index: 999;
            right: 0;
            left: 0;
            top: 0;
        }
    }
    .noChartData {
        height: 120px;
        line-height: 120px;
        text-align: center;
        color: #5e827b;
    }
    .mark{
        line-height: 52px;
        background: #fff;
        margin-bottom: 20px;
        padding: 0 20px;
    }
</style>