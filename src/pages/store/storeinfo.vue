<template>
    <div>
        <template-search-list ref='pageTmpl' title='店铺管理' :method='getDate'>
            <template slot="page-table-operations">
                <nt-button type="warning" @click="addShop('new')">新增店铺</nt-button>
            </template>
            <template slot='page-table-right-operations'>
                
            </template>
            <template slot='page-table' slot-scope='props' class='contentBox'>
                <div class='contentBox'>
                    <nt-table :data='props.tableData'>
                        <nt-table-column min-width='20' width='140' prop="">
                            <template slot-scope="scope">
                                <nt-radio class="store-mng-radio radio" v-model="radio.shopid" :label="scope.row.id">
                                    <span v-if="scope.row.isDefault==1">默认店铺</span>
                                    <span v-else="scope.row.isDefault==0">设为默认</span>
                                </nt-radio>
                                <!--<nt-radio class="radio" v-else="scope.row.isDefault==0" v-model="radio.shopid"-->
                                <!--:label="scope.row.id">备选项-->
                                <!--</nt-radio>-->
                            </template>
                        </nt-table-column>
                        <nt-table-column label='序号' min-width='20'>
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </nt-table-column>
                        <nt-table-column prop='shopName' label='店铺名称' min-width='30'></nt-table-column>
                        <nt-table-column prop="terrace" label='平台/站点' min-width='30'></nt-table-column>
                        <nt-table-column prop='urlAddress' label='URL地址' min-width='100'></nt-table-column>
                        <nt-table-column label='操作' width='120'>
                            <template slot-scope="scope">
                                <div class="operate-box">
                                    <!--<nt-tooltip class="item opera_btn vM" effect="dark" content="编辑" placement="top">-->
                                    <!--<a href="javascript:void(0);" @click="redact('old',scope.row.id)"><i-->
                                    <!--class="nt-icon-xbn-12 f18"></i></a>-->
                                    <!--</nt-tooltip>-->
                                    <!--<nt-tooltip class="item opera_btn vM" content="删除" placement="top">-->
                                    <!--<a class="" href="javascript:void(0);" @click="rmShop(scope.row.id)"><i-->
                                    <!--class="nt-icon-xbn-13 f18"></i></a>-->
                                    <!--</nt-tooltip>-->
                                    <nt-button type="text" @click="redact('old',scope.row.id)">编辑</nt-button>
                                    <nt-button type="text" @click="rmShop(scope.row.id, $event)">删除</nt-button>
                                </div>
                            </template>
                        </nt-table-column>
                    </nt-table>
                    <nt-dialog :title="titleBox" :visible.sync="dialogTableVisible" :closeOnClickModal="false">
                        <nt-form ref="form" :model="ruleForm" :rules="rules" label-width="80px">
                            <nt-form-item label="店铺名称" prop="shopName">
                                <nt-input type="text" v-model="ruleForm.shopName" :maxlength="50"></nt-input>
                            </nt-form-item>
                            <nt-form-item label="店铺URL" prop="shopURL">
                                <nt-input type="text" v-model="ruleForm.shopURL"></nt-input>
                            </nt-form-item>
                            <nt-form-item style="text-align: right;">
                                <nt-button type="primary" @click="submit">确 定</nt-button>
                                <nt-button @click="cancel">取 消</nt-button>
                            </nt-form-item>
                        </nt-form>
                    </nt-dialog>
                </div>
            </template>
        </template-search-list>
    </div>
</template>

<script>
    import {TemplateSearchList} from 'xbn-biz-components'
    import STATUSCODE from '../../config/statusCode'

    export default {
        data() {
            return {
                radio: {
                    shopid: ''
                },
                idStatus: false,
                brevity: '',
                tableData: {},
                titleBox: '',
                dialogTableVisible: false,
                //规则验证
                ruleForm: {
                    shopName: '',
                    shopURL: ''
                },
                rules: {
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
                infoList: '',
                old: ''
            }

        }
        ,
        components: {
            TemplateSearchList
        }
        ,
        created: function () {
            this.$nextTick(function () {
                // this.crates(' 店铺信息');
                // let oinfod = document.querySelector('.infod');
                // oinfod.addEventListener('click', () => {
                //     this.$router.push('/storeInfo')
                // })
            })
        },
        mounted() {
            this.$nextTick(function () {
                setTimeout(() => {
                    //document.querySelector('.deft').click();
                    let oradio=document.querySelectorAll('.radio');
                    for(let i=0;i<oradio.length;i++){
                        oradio[i].addEventListener('click',(e)=>{
                            if(e.target.localName === 'input'){
                                this.radios()
                            }
                        })
                    }
                }, 600)
                document.querySelector('.nt-dialog__close').addEventListener('click',()=>{
                    this.$refs.form.resetFields();//重置并取消验证信息
                });
            })

        },
        methods: {
            //获取表格数据
            async getDate() {
                let pagingInfo = {
                    pageNo: 1,
                    pageSize: 10,
                    query: {
                        userId:1
                    }
                };

                let listData = [];
                this.infoList = await this.ctx.models.MarketingModel.shop.findShopList(pagingInfo, this.ctx);

                this.infoList.data.list.forEach(item => {

                    item.terrace = ' Amazon/美国站'
                });

                let de = this.infoList.data.list.filter(item => {

                    return item.isDefault == 1
                });

                if (de.length > 0) {
                    this.radio.shopid = de[0].id;
                    listData[0] = de[0];
                }

                this.infoList.data.list.forEach(item => {
                    if (item.isDefault == 0) {
                        listData.push(item)
                    }
                });

                return this.tableData = {
                    data: {
                        list: listData,
                        page: this.infoList.data.page
                    },
                    message: this.infoList.message,
                    statusCode: this.infoList.statusCode
                }
            },
            //新增店铺按钮
            async addShop(val) {
                let count = await this.ctx.models.MarketingModel.shop.selectCount(this.ctx);
                if (count.data[0] == 10) {
                    this.$message({
                        message: '不能在添加了，您最多可设置10个店铺哦。',
                        type: 'error',
                    })
                } else {
                    this.dialogTableVisible = true;
                    this.titleBox = '新增店铺';
                    this.brevity = val;
                }
                this.ruleForm.shopName = '';
                this.ruleForm.shopURL = '';
            },
            //确定新增店铺按钮
            submit() {
                let message = '';
                let item = '';
                let statusCode = '';
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        let parameter = {
                            id: this.old,
                            shopName: this.ruleForm.shopName,
                            urlAddress: this.ruleForm.shopURL,
                        };

                        if (this.brevity == 'new') {
                            item = await this.ctx.models.MarketingModel.shop.addShop(parameter, this.ctx);
                            statusCode = item.statusCode;
                            message = '新增店铺成功'
                        } else if (this.brevity == 'old') {
                            item = await this.ctx.models.MarketingModel.shop.redactShop(parameter, this.ctx);
                            statusCode = item.data.statusCode;
                            message = '编辑店铺成功'
                        }

                        if (statusCode == STATUSCODE.SUCCESS) {
                            this.$message({
                                message: `${message}`,
                                type: 'success',
                            })
                        } else {
                            this.$message({
                                message: '错了哦，这是一条错误消息',
                                type: 'error'
                            })
                        }
                        this.dialogTableVisible = false;//隐藏弹窗
                        await this.$refs.pageTmpl.refreshData();//刷新列表
                    } else {
                        return false;
                    }
                });
            },
            //取消
            cancel() {
                this.dialogTableVisible = false;
                this.$refs.form.resetFields();//重置并取消验证信息
            },
            //编辑新增店铺
            redact(val, oldID) {
                this.dialogTableVisible = true;
                this.titleBox = '编辑店铺信息';
                this.brevity = val;

                let listArray = this.tableData.data.list;
                let i = listArray.filter(item => {
                    if (item.id == oldID) {
                        return item
                    }
                });
                this.ruleForm.shopName = i[0].shopName;
                this.ruleForm.shopURL = i[0].urlAddress;
                this.old = i[0].id;

            },
            //删除店铺
            async rmShop(val, eve) {
                await this.$popconfirm(eve.target, '您确定要删除店铺吗？')
                let parameter = {
                    id: val,
                    isDefault: 9
                };
                let del = await this.ctx.models.MarketingModel.shop.redactShop(parameter, this.ctx);
                if (del.data.statusCode == STATUSCODE.SUCCESS) {
                    this.$message({
                        message: `删除成功`,
                        type: 'success',
                    })
                } else {
                    this.$message({
                        message: '错了哦，这是一条错误消息',
                        type: 'error'
                    })
                }
                await this.$refs.pageTmpl.refreshData();//刷新列表
            },
            async radios(){
                let pagingInfo = {
                    pageNo: 1,
                    pageSize: 10,
                    query: {
                        userId:1
                    }
                };
                this.infoList = await this.ctx.models.MarketingModel.shop.findShopList(pagingInfo, this.ctx);

                let de = this.infoList.data.list.filter(item => {
                    return item.isDefault == 1
                });

                if(de.length>0){
                    let p1 = {
                        id: de[0].id,
                        isDefault: 0
                    };
                    let s = await this.ctx.models.MarketingModel.shop.redactShop(p1, this.ctx);
                    if (s.data.statusCode == STATUSCODE.SUCCESS) {
                        let p2 = {
                            id: this.radio.shopid,
                            isDefault: 1
                        };
                        let s2 = await this.ctx.models.MarketingModel.shop.redactShop(p2, this.ctx);
                        if (s2.data.statusCode == STATUSCODE.SUCCESS) {
                            this.$message({
                                message: `修改默认店铺成功`,
                                type: 'success',
                            })
                        } else {
                            this.$message({
                                message: '错了哦，这是一条错误消息',
                                type: 'error'
                            })
                        }
                    } else {
                        this.$message({
                            message: '错了哦，这是一条错误消息',
                            type: 'error'
                        })
                    }
                }else {
                    let p2 = {
                        id: this.radio.shopid,
                        isDefault: 1
                    };
                    let s2 = await this.ctx.models.MarketingModel.shop.redactShop(p2, this.ctx);
                    if (s2.data.statusCode == STATUSCODE.SUCCESS) {
                        this.$message({
                            message: `修改默认店铺成功`,
                            type: 'success',
                        })
                    } else {
                        this.$message({
                            message: '错了哦，这是一条错误消息',
                            type: 'error'
                        })
                    }
                }
                await this.$refs.pageTmpl.refreshData();//刷新列表
            }
        }
    }
</script>

<style lang="less">
    .tablelist {
        padding: 24px;
    }

    .operationBox .nt-page-right-buttons {
        float: right !important;
    }
    .store-mng-radio {
        margin-left: 12px;
    }
</style>