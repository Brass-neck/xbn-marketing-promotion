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

    .menu-text {
        margin-left: 20px;
        color: #6DB5EB;
        &:hover {
            color: #6DB5EB;
        }
    }

    .istest {
        color: red;
    }

</style>
<template>
    <div class="product_add">
        <page-head :title="'商品管理'"></page-head>
        <div class="operationBox">
            <nt-row>
                <nt-col :span="12" class="f16">
                    <router-link to="/product-manage/"><i class="nt-icon-arrow-left f14 mR10"></i>添加商品</router-link>
                </nt-col>
                <nt-col :span="12" align="right">
                    <nt-button type="primary" @click="savePdt($event)">保存</nt-button>
                    <router-link class="mL10" to="/product-manage/">
                        <nt-button type="primary">取消</nt-button>
                    </router-link>
                </nt-col>
            </nt-row>
        </div>

        <nt-form ref="form" :model="form" label-width="120px" :rules="rules" class="contentBox">
            <div class="border_layout competing_infor">
                <div class="competing_infor_main log_main">
                    <!-- <div>
                        <i class="nt-icon-xbn-22 col_f8ac59 vM"></i>
                        <span class="col_57595b">目前系统仅支持添加Amazon，后续会扩展至更多平台。</span>
                    </div> -->
                    <nt-form-item label="商品平台：" prop="pdtSiteValue1">
                        <nt-select v-model="form.pdtSiteValue1" placeholder="Amazon" disabled>
                            <nt-option
                                    v-for="item in proPlatform"
                                    :key="item.value"
                                    :label="item.country"
                                    :value="item.value">
                                <span><i class="flag_icon flag amer"></i><em class="pL30">{{ item.country }}</em></span>
                            </nt-option>
                        </nt-select>
                    </nt-form-item>
                    <nt-form-item label="商品站点：" prop="pdtSiteValue">
                        <nt-select v-model="form.pdtSiteValue" placeholder="美国" disabled>
                            <nt-option
                                    v-for="item in pdtSite"
                                    :key="item.value"
                                    :label="item.country"
                                    :value="item.value">
                                <span><i class="flag_icon flag amer"></i><em class="pL30">{{ item.country }}</em></span>
                            </nt-option>
                        </nt-select>
                    </nt-form-item>
                    <nt-form-item label="所属店铺：" prop="shopId">
                        <nt-select v-model="form.shopId" placeholder="选择店铺">
                            <nt-option
                                    v-for="item in storeList"
                                    :key="item.id"
                                    :label="item.shopName"
                                    :value="item.id">
                            </nt-option>
                        </nt-select>
                        <nt-button type="text" class="menu-text" @click="addShop">新增店铺</nt-button>
                    </nt-form-item>
                    <nt-form-item label="商品ASIN：" prop="merchantASIN" class="mT16">
                        <nt-input type="textarea" :rows="10" v-model="form.merchantASIN" class="w600 fL" style="width:600px;"></nt-input>
                        <!-- <nt-tooltip class="" effect="dark" content="您可以多行输入以便添加多个商品ASIN，但请确保每行输入一个ASIN。同时请确保所有商品ASIN都属于同一个站点。" placement="right">
                            <i class="nt-icon-xbn-19 col_f8ac59 vT mL10 f16"></i>
                        </nt-tooltip> -->
                    </nt-form-item>
                    <nt-form-item>
                        <p class="col_57595b">（请确保每一行输入一个ASIN，最多可输入10个）</p>
                    </nt-form-item>
                </div>
            </div>
        </nt-form>
        <nt-dialog title="新增店铺" :visible.sync="dialogTableVisible" :closeOnClickModal="false">
            <nt-form ref="form1" :model="ruleForm" :rules="rules1" label-width="80px">
                <nt-form-item label="店铺名称" prop="shopName">
                    <nt-input type="text" v-model="ruleForm.shopName" :maxlength="50"></nt-input>
                </nt-form-item>
                <nt-form-item label="店铺URL" prop="shopURL">
                    <nt-input type="text" v-model="ruleForm.shopURL"></nt-input>
                </nt-form-item>
                <nt-form-item label="" v-if="warns">
                    <div class="istest">
                        不能再添加了，您最多可设置10个店铺哦~
                        <router-link class="menu-text" to="/storeInfo">设置店铺</router-link>
                    </div>
                </nt-form-item>
                <nt-form-item style="text-align: right;">
                    <nt-button type="primary" @click="submit">确 定</nt-button>
                    <nt-button @click="cancel">取 消</nt-button>
                </nt-form-item>
            </nt-form>
        </nt-dialog>
    </div>


</template>


<script>
    import {PageHead} from 'xbn-biz-components';
    import STATUSCODE from '../../config/statusCode'
    //import '!style-loader!css-loader!less-loader!../../style/index.less'

    export default {
        data() {
            return {
                rules: {
                    merchantASIN: [
                        {required: true, message: '请输入商品ASIN', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                let asin = value.split('\n');
                                let a = asin.filter(time => time !== '')
                                let s = a.every(time => {
                                    return /^([A-Z0-9]{10})$|^(\d{10})$/.test(time)
                                });
                                if (a.length > 10) {
                                    callback(new Error("最多可输入10个ASIN"));
                                } else {
                                    if (s) {
                                        callback()
                                    } else {
                                        callback(new Error("请输入正确的ASIN"));
                                    }
                                }
                            }
                        }
                    ],
                    pdtSiteValue1: [
                        {required: true, message: '请选择商品站点', trigger: 'blur'}
                    ],
                    pdtSiteValue: [
                        {required: true, message: '请选择商品站点', trigger: 'blur'}
                    ],
                    shopId: [
                        {required: true, message: '请选择店铺'}
                    ]
                },
                pdtSite: [
                    {
                        value: 'A2EUQ1WTGCTBG2',
                        country: '美国',
                        siteImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509365551055&di=c39f3fb34eea531c1c26278eeede7d98&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F78310a55b319ebc420a118918826cffc1f1716d8.jpg'
                    }
                ],
                proPlatform: [
                    {
                        value: '11',
                        country: 'Amazon'
                    }
                ],

                form: {
                    merchantASIN: '',
                    pdtSiteValue: 'A2EUQ1WTGCTBG2',
                    pdtSiteValue1: '11',
                    shopId: ''
                },
                totalPdtNum: 0,
                storeList: '',
                dialogTableVisible: false,
                warns: false,
                //规则验证
                ruleForm: {
                    shopName: '',
                    shopURL: ''
                },
                rules1: {
                    shopName: [
                        {required: true, message: '请填写店铺名称', trigger: 'blur'},
                        {
                            validator: async (rule, value, callback) => {
                                let only = await this.ctx.models.MarketingModel.shop.checkShop(this.ruleForm.shopName, this.ctx);
                                if (only.data[0] != 0) {
                                    callback('此店铺名称重复')
                                }
                            }
                        }
                    ],
                    shopURL: [
                        {required: true, message: '请填写店铺URL', trigger: 'blur'},
                        {
                            validator: async (rule, value, callback) => {
                                let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;

                                reg.test(value) ? /seller/.test(value) ? callback() : callback('无法获取SellerID，请确认店铺URL是否正确。') : callback('请输入正确链接')

                            }
                        }
                    ]
                },
            };
        },
        created() {
            this.totalPdtNum = 500 - this.$route.query.totalPdtNum
            this.getStore()
        },
        mounted() {
            this.$nextTick(function () {
                console.log(this.$refs.form1)
                document.querySelector('.nt-dialog__close').addEventListener('click',()=>{
                    this.$refs.form1.resetFields();//重置并取消验证信息
                });
            })
        },
        methods: {
            arrUnique: function (array) {
                var n = [];
                for (var i = 0; i < array.length; i++) {
                    if (n.indexOf(array[i]) == -1) n.push(array[i]);
                }
                return n;
            },
            arrCompare: function (a, b) {
                for (var i = 0; i < b.length; i++) {
                    for (var j = 0; j < a.length; j++) {
                        if (a[j] == b[i]) {
                            a.splice(j, 1);
                            j = j - 1;
                        }
                    }
                }
                return a;
            },
            savePdt: function (event) {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {

                        let allASIN = this.form.merchantASIN.split('\n'),
                            handleAllASIN = [],
                            repeatASIN = [],
                            newASIN = []

                        allASIN = this.arrUnique(allASIN)
                        allASIN.forEach((item) => {
                            if (item) {
                                handleAllASIN.push(item)
                            }
                        });

                        let sid = this.storeList.filter(item => {
                            return item.id == this.form.shopId
                        });

                        let res = await this.ctx.models.MarketingModel.product.getProduct(handleAllASIN, sid[0].sellerId + '', this.ctx),
                            dataArr = res.data;

                        repeatASIN = dataArr.map((item) => {
                            return item.extractKey
                        })

                        newASIN = this.arrCompare(handleAllASIN, repeatASIN)
                        if (allASIN.length > this.totalPdtNum) {
                            this.$message({
                                type: 'warning error',
                                message: '商品总数超出500个的最大限制，您本次最多只能添加' + this.totalPdtNum + '个ASIN，请修改后并重新保存。'
                            })
                        }
                        else {
                            // 可添加 禁用保存按钮
                            event.target.disabled = true
                            // 总数小于500，可添加，分为多种情况
                            if (repeatASIN.length && newASIN.length == 0) {
                                // 只有重复asin，不掉add接口，直接提示重复错误
                                this.$message({
                                    type: 'warning error',
                                    message: 'ASIN是' + repeatASIN + '的商品已存在，无法重复添加。'
                                })
                            }
                            else {
                                // 有重复也有新asin，传newAsin  或者 只有newAsin
                                let data = {
                                        type: 'awsProductExtractor',
                                        ids: newASIN,
                                        marketplaceId: this.form.pdtSiteValue,
                                        shopId: this.form.shopId
                                    },
                                    res = await this.ctx.models.MarketingModel.product.addProduct(data, 1, this.ctx);

                                res.statusCode == STATUSCODE.SUCCESS &&
                                (
                                    repeatASIN.length ? (
                                        this.$message({
                                            type: 'warning error',
                                            message: 'ASIN是' + repeatASIN + '的商品已存在，无法重复添加。'
                                        })
                                    ) : (

                                        this.$message({
                                            type: 'success',
                                            message: '商品添加成功。系统正在收集商品信息，可能要花费一点时间，请耐心等待。'
                                        })
                                    )
                                )
                            }
                            this.$router.push('/product-manage')
                        }
                    }
                })


            },
            async getStore(fromNew) {
                let pagingInfo = {
                    pageNo: 1,
                    pageSize: 10,
                    query: {
                        userId:1
                    }
                };
                let listData = [];
                let infoList = await this.ctx.models.MarketingModel.shop.findShopList(pagingInfo, this.ctx);

                let de = infoList.data.list.filter(item => {

                    return item.isDefault == 1
                });

                if (de.length > 0) {
                    listData[0] = de[0];
                }

                

                infoList.data.list.forEach(item => {
                    if (item.isDefault == 0) {
                        listData.push(item)
                    } else {
                        this.form.shopId = item.id
                    }
                });

                fromNew && (this.form.shopId = infoList.data.list[0].id)

                this.storeList = listData;
            },
            async addShop() {
                this.dialogTableVisible = true;
                this.ruleForm.shopName = '';
                this.ruleForm.shopURL = '';
            },
            async submit() {
                this.$refs.form1.validate(async (valid) => {
                    if (valid) {
                        let count = await this.ctx.models.MarketingModel.shop.selectCount(this.ctx);
                        if (count.data[0] == 10) {
                            this.warns = true;
                        } else {
                            let parameter = {
                                shopName: this.ruleForm.shopName,
                                urlAddress: this.ruleForm.shopURL,
                            };
                            let item = await this.ctx.models.MarketingModel.shop.addShop(parameter, this.ctx);
                            if (item.statusCode == STATUSCODE.SUCCESS) {
                                this.$message({
                                    message: `新增店铺成功`,
                                    type: 'success',
                                })
                            }
                            this.getStore('fromNew');
                            this.dialogTableVisible = false;
                        }
                    }
                })
            },
            //取消
            cancel() {
                this.dialogTableVisible = false;
                this.$refs.form1.resetFields();//重置并取消验证信息
            },
        },
        components: {
            PageHead
        }
    }
</script>
<style>
</style>