<style lang="less" scoped>
    .pdt-manage {
    .nt-textarea{width:65%;vertical-align: top}
        .nt-form--inline .nt-form-item__content {
            width: 100%
        }
        h3 {
            font-weight: 700;
        }
        .mr20 {
            margin-right: 20px;
        }
    .w30p {
        width: 30%
    }
    .w80p {
        width: 80%
    }
        .w45p {
            width: 45%
        }
        .w100 {
            width: 100px;
        }
        .w100p {
            width: 100%
        }
        .vat {
            vertical-align: top;
        }
        .disib {
            display: inline-block
        }
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

        .edit_box {
            padding: 40px;
            .each_item {
                margin-left: 60px;
                .item_label {
                    vertical-align: top;
                }
                .item_content {
                    word-break: break-all;
                    display: inline-block;
                }
                .necessary_icon {
                    color: red;
                    font-size: 26px;
                    vertical-align: -10px;
                    margin-right: 10px;
                    font-weight: bold;
                    + span {
                        display: inline-block;
                        width: 92px;
                    }
                }
                .nt-form-item__error {
                    margin: -6px 0 0 128px;
                }
            }
        }
    }

    #but {
        position: relative;
        top: -45px;
        left: 25px;
    }

    .basics {
        border-radius: 5px;
        border: 01px solid #BBBBBB;
        background: #fff;
    }

    .goods {
        width: 570px;
        height: 20px;
        padding: 5px 10px;
        background: #F5F5F5;
    }

    .sel {
        width: 150px;
        padding: 3px;
    }

    .selg {
        width: 240px;
        padding: 3px;
    }

    .gdprice {
        width: 150px;
        height: 34px;
        line-height: 34px;
        padding: 0px 0px;
    }

    .gdtitle {
        width: 560px;
    }

    .xbn-avatar-uploader .nt-upload-list__item, .nt-upload--picture-card, .upload-trigger {
        width: 100px;
        height: 100px;
    }

    .upload-trigger .nt-icon-plus {
        position: relative;
        top: -15px;
    }

    .text1 {
        resize: none;
        width: 400px;
        height: 80px;
        padding: 10px 15px;
    }

    .bot {
        text-align: center;
    }

    .uploaderCover {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 0;
        right: 0;
        z-index: 22;
        cursor: pointer;
    }

    .por {
        position: relative;
    }
    .category-notice {
        margin: -20px 0 0 120px;
    }
    .tax-notice {
        display: inline-block;
        width: 38%;
        vertical-align: middle;
        line-height: 20px;
    }
    .pro-imgs {
        .nt-upload-list__item-download > i {
            background: url('../../images/download.svg') no-repeat;
            width: 26px;
            height: 26px;
            background-size: 26px;
            vertical-align: -4px;
        }
        .nt-icon-xbn-21:before {
            content: none;
        }
    }
    .custom-size {
        .nt-form-item__error {
            margin-left: 0 !important;
        }
    }
</style>

<template>
    <nt-form labnt-position="left" ref="formBox" inline class="edit_box" :model="expandProp">
        <h3>基础信息</h3>
        <div class="each_item">
            <nt-form-item class="w30p">
                <span class="item_label">商品ASIN：</span><span class="item_content">{{ expandProp.extractKey }}</span>
            </nt-form-item>
            <nt-form-item class="w30p">
                <span class="item_label">商品站点：</span><span class="item_content">美国站</span>
            </nt-form-item>
            <nt-form-item class="w30p">
                <span class="item_label">店铺信息：</span><span class="item_content">{{expandProp.shopName}}</span>
            </nt-form-item>
        </div>
         
        <div class="each_item">
            
            <nt-form-item class="w100p" prop="title">
                <span class="necessary_icon">*</span><span>商品标题：</span>
                <span class="gdtitle" v-text="expandProp.title"></span>
            </nt-form-item>
            <nt-form-item class="w45p">
                <span class="necessary_icon">*</span><span>库存状况：</span><span>{{expandProp.availability}}</span>
            </nt-form-item>
            <nt-form-item class="w45p">
                <span class="necessary_icon">*</span><span>商品价格：</span><span>{{expandProp.salePriceFormatted.split("$")[1]}} {{expandProp.priceCurrency}}</span>
            </nt-form-item>
            <nt-form-item class="w45p" prop="gtin">
                <span class="necessary_icon">*</span><span>Gitn：</span>
                <span class="gdprice" v-text="expandProp.gtin"  ></span>
            </nt-form-item>
            <nt-form-item class="w45p" prop="brand">
                <span class="necessary_icon">*</span><span>Brand：</span>
                <span class="gdprice" v-text="expandProp.brand"  ></span>
            </nt-form-item>
            <nt-form-item class="w100p">
                <span class="necessary_icon">*</span>
                <span>产品着陆页：</span><a class="main_color" :href="expandProp.link" target="_blank">{{expandProp.link}}</a>
            </nt-form-item>
            <!--<nt-form-item class="w45p">-->
                <!--<span class="necessary_icon">*</span><span>供应商：</span>-->
                <!--<input type="text" class="basics gdprice" v-text="expandProp.vendor">-->
            <!--</nt-form-item>-->

            <!--<nt-form-item class="w45p">-->
                <!--<span class="necessary_icon">*</span><span>条形码：</span>-->
                <!--<input type="text" class="basics gdprice" v-text="expandProp.todo">-->
            <!--</nt-form-item>-->
            <!--<nt-form-item class="w45p">-->
                <!--<span class="necessary_icon">*</span><span>产品品类：</span>-->
                <!--<input type="text" class="basics gdprice" v-text="expandProp.categoryRoot">-->
            <!--</nt-form-item>    -->
            <nt-form-item class="w100p" prop="googleProductCategory">
                <span class="necessary_icon">*</span><span>Google品类：</span>
                <span v-text="expandProp.googleProductCategory"></span>
            </nt-form-item>
            <!-- <nt-form-item class="w100p" prop="googleCategoryId">
                <input type="hidden" v-text="googleCategoryId0"/>
            </nt-form-item> -->
            <nt-form-item class="w100p">
                <span class="necessary_icon">*</span><span>商品图片：</span>
                <div class="vat disib">
                    <img :src="item.url" v-for="item in multiUrls" style="width:100px;height:100px;margin-right: 10px;">
                </div>
            </nt-form-item>
            <nt-form-item class="w100p" prop="proImages"></nt-form-item>
            <nt-form-item class="w100p" prop="description">
                <span class="necessary_icon">*</span><span>产品描述：</span>
                <span class="disib vat w80p" v-text="expandProp.description"></span>
            </nt-form-item>
            <!-- <nt-form-item class="w45p">
                <span class="necessary_icon">*</span><span>商品状态：</span>
                <nt-select v-text="condition">
                    <nt-option value="New">New</nt-option>
                </nt-select>
            </nt-form-item> -->
        </div>
        
        <h3>广告组信息</h3>
        <div class="each_item">
            <nt-form-item class="w45p">
                <span class="item_label">广告组名称：</span><span class="item_content">{{ expandProp.campaignName || '无' }}</span>
            </nt-form-item>
            <nt-form-item class="w45p">
                <span class="item_label">广告组编号：</span><span class="item_content">{{ expandProp.campaignName? expandProp.userId + '_' +expandProp.campaignId: '无' }}</span>
            </nt-form-item>
        </div>

        <div v-if="showApparel">
            <h3>服装类必填项</h3>
            <div class="each_item">
                <nt-form-item class="w45p" prop="gender">
                    <span class="necessary_icon">*</span><span>性别：</span>
                    <nt-select v-text="expandProp.gender">
                        <nt-option
                                v-for="item in sex"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </nt-option>
                    </nt-select>
                </nt-form-item>
                <nt-form-item class="w45p" prop="ageGroup">
                    <span class="necessary_icon">*</span><span>年龄组：</span>
                    <nt-select v-text="expandProp.ageGroup">
                        <nt-option
                                v-for="item in age"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </nt-option>
                    </nt-select>
                </nt-form-item>
                <nt-form-item class="w45p" prop="size">
                    <span class="necessary_icon">*</span><span>Size：</span>
                    <nt-select v-text="expandProp.size">
                        <nt-option
                                v-for="item in size"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </nt-option>
                    </nt-select>
                    <nt-form-item v-if="expandProp.size == '自定义'" prop="customSize" class="custom-size">
                        <span v-text="expandProp.customSize" class="gdprice"  ></span>
                    </nt-form-item>
                </nt-form-item>
                
                <nt-form-item class="w45p" prop="color">
                    <span class="necessary_icon">*</span><span>颜色：</span>
                    <span type="text" class="gdprice" v-text="expandProp.color"  ></span>
                    <span>请使用正确颜色说明：如Red</span>
                </nt-form-item>
            </div>
        </div>

        <h3>税率及航运</h3>
        <div class="each_item">
            <nt-form-item class="w45p" prop="tax">
                <span class="necessary_icon">*</span><span>Tax：</span>
                <span class="gdprice" v-text="expandProp.tax"  ></span>
            </nt-form-item>
            <nt-form-item class="w45p" prop="shipping">
                <span class="necessary_icon">*</span><span>Shipping：</span>
                <span class="gdprice" v-text="expandProp.shipping"  ></span>
            </nt-form-item>
        </div>
           
        <h3>产品补充信息</h3>
        <div class="each_item">
            <nt-form-item ref="cc" class="w100p" pro="introduce">
                <span class="w100 disib">推荐理由：</span>
                <span class="disib vat w80p" v-text="expandProp.introduce"></span>
            </nt-form-item>
            <nt-form-item ref="cc" class="w100p" pro="serviceTips">
                <span class="w100 disib">服务小贴士：</span>
                <span class="disib vat w80p" v-text="expandProp.serviceTips"></span>
            </nt-form-item>
            <nt-form-item ref="cc" class="w100p" pro="brandIntroduce">
                <span class="w100 disib">品牌介绍：</span>
                <span class="disib vat w80p" v-text="expandProp.brandIntroduce"></span>
            </nt-form-item>
        </div>
    </nt-form>
</template>

<script type="text/javascript">
    import {AvatarUpload} from 'xbn-biz-components'
    import STATUSCODE from '../../config/statusCode'

    export default {
        props: {
            row: {
                type: Object
            }
        },

        data() {
            return {
                expandProp: {
                    formattedPrice: '',
                    salePriceFormatted: '',
                    tax: '',
                    shipping: '',
                    description: '',
                    title: '',
                    gtin: '',
                    brand: '',
                    customSize: 'a'
                },
                size: [
                    {
                        value: 'one size',
                        label: 'one size'
                    },
                    {
                        value: 'OS',
                        label: 'OS'
                    },
                    {
                        value: 'one size fits all',
                        label: 'one size fits all'
                    },
                    {
                        value: 'OSFA',
                        label: 'OSFA'
                    },
                    {
                        value: 'one size fits most',
                        label: 'one size fits most'
                    },
                    {
                        value: 'OSFM',
                        label: 'OSFM'
                    },
                    {
                        value: '自定义',
                        label: '自定义'
                    }
                ],
                sex: [
                    {
                        value: 'Male',
                        label: 'Male'
                    },
                    {
                        value: 'Female',
                        label: 'Female'
                    },
                    {
                        value: 'Unisex',
                        label: 'Unisex'
                    }
                ],
                age: [
                    {
                        value: 'Newborn',
                        label: 'Newborn'
                    },
                    {
                        value: 'Infant',
                        label: 'Infant'
                    },
                    {
                        value: 'Toddler',
                        label: 'Toddler'
                    },
                    {
                        value: 'Kids',
                        label: 'Kids'
                    },
                    {
                        value: 'Adult',
                        label: 'Adult'
                    }
                ],
                validateMsg:'',
                showUploadPic: !0,
                type: 'image/jpeg,image/png',
                multiUrls: [],
                showApparel: !1,
                submitBtnText: ['保存并提交审核', '保存'],
                submitBtnTextIndex: 0
            }
        },

        methods: {
            async modifyProduct() {
                var that = this
                this.$refs.formBox.validate(async (valid) => {
                    if (valid) {

                        if ((that.expandProp.status == 6) || that.expandProp.status == 8) {
                            that.expandProp.status = that.expandProp.manualReviewStatus = 0
                        } else if (that.expandProp.status == 2) {
                            that.expandProp.status = 0
                            that.expandProp.manualReviewStatus = 1
                        }else {
                            that.expandProp.status = that.expandProp.manualReviewStatus = null
                        }

                        let imgLinkArr = []
                        that.multiUrls.forEach(i=>{
                            imgLinkArr.push(i.url)
                        })
                        let len = imgLinkArr.length
                        for(let i = 0 ; i<len;i++){
                            imgLinkArr[i] = '"'+ imgLinkArr[i] +'"'
                        }

                        if(that.expandProp.size == '自定义'){
                            that.expandProp.size = that.expandProp.customSize
                        }
                        that.expandProp.additionalImageLink = '{"largeImages":[[' + imgLinkArr + ']]}'

                        const loading = this.$loading({
                            fullscreen: true,
                            text: '数据提交中...'
                        });

                        let data = this.expandProp,
                            res = await this.ctx.models.MarketingModel.product.modifyProduct(this.ctx, data);

                        loading.close()
                        res.statusCode == STATUSCODE.SUCCESS ? (
                        this.submitBtnTextIndex == 0 ? (
                                this.$message({
                                    showClose: true,
                                    type: 'success',
                                    message: '提交成功!'
                                })
                        ) : (
                                this.$message({
                                    showClose: true,
                                    type: 'success',
                                    message: '编辑成功!'
                                })
                        ),this.validateMsg = '' && this.refresh()
                        ) : (
                            this.validateMsg = res.data[0].description || res.message
                        )
                    }
                })
            },

            uploadPic:function(){
                           this.$prompt('请输入图片地址', '提示', {
                               confirmButtonText: '确定',
                               cancelButtonText: '取消',
                               inputPattern: /\S/,
                               inputErrorMessage: '图片地址不能为空',
                           }).then(({ value }) => {

                               if (value.trim()) {
                    let img = new Image()
                    img.src = value
                    let me = this
                    img.onload = function() {
                        me.multiUrls.push({
                            url: value
                        })

                        me.multiUrls.length === 5 && (me.showUploadPic = !1)
                    }
                    img.onerror = function() {
                        me.$alert('图片无效')
                    }
                }
               });
           },

           // 根据pk查询商品详情
            async getDetailByPk() {

                this.multiUrls = []
                let row = this.row

                let pkID = row.pk,
                    res = await this.ctx.models.MarketingModel.product.getProductInfo(this.ctx, pkID),
                    data = res.data,
                    picDataArr,
                    picDataArrMinLen;

                if (data.additionalImageLink) {
                    picDataArr = JSON.parse(data.additionalImageLink).largeImages[0] || []
                    picDataArrMinLen = Math.min(picDataArr.length, 5)

                    for (let i = 0; i < picDataArrMinLen; i++) {
                        this.multiUrls.push({
                            //name :'11' ,
                            url: picDataArr[i]
                        })
                    }

                    this.showUploadPic = this.multiUrls.length === 5 ? !1 : !0
                }
                this.expandProp = data

                // 配置data没传过来的一些默认值
                this.expandProp.size = data.size || 'one size';
                this.expandProp.variantGrams = 0;

                if (data.googleProductCategory) {
                    this.googleProductCategory = data.googleProductCategory.split('>');
                    this.googleProductCategoryIndex = 0
                }
                this.getGoogleCategory();
                //this.expandRow(row);
                this.goocat_0 = this.goocat_1 = !1

                //状态数组
                let sarray = [0, 1, 3, 4, 5];
                let s = sarray.some(tiem => {
                    return tiem == data.status
                });
                //如果updateTime时间之后4个小时就不让编辑
                if (s) {
                    this.showStatus = true;
                } else if (data.status == 2) {
                    //对updateTime时间的格式处理
                    let upTime = data.updateTime.split(' ');
                    let upDays = upTime[0].split('-');
                    let upMinutes = upTime[1].split(':');

                    //本地时间的创建
                    let localTime = new Date();
                    let localYear = localTime.getFullYear(); //年
                    let localMonth = localTime.getMonth() + 1; //月
                    let localDay = localTime.getDay();  //日
                    let localHours = localTime.getHours(); //小时

                    //判断是否超时 false没超时 true超时
                    this.upStatus = localMonth > upDays[1] ? false : localDay > upDays[2] ? false : Math.abs(localHours - upMinutes[0]) >= 4 ? false : true;
                    if (this.upStatus) {
                        this.showStatus = true;
                    }
                }

                this.setSubmitBtnText()
            },

            async getGoogleCategory(id = 0, index = 'one') {
                if (id == null) return
                let res = await this.ctx.models.MarketingModel.product.googleCategory(this.ctx, id)

                if (index === 'one') {
                    let ridId = [412, 5605]
                    res.data.forEach((i, j) => {
                        ridId.indexOf(i.id) > -1 && res.data.splice(j, 1)
                    })
                }
                this.googleCat[index] = res.data

                this.googleProductCategory.length && this.echoGoogleCat()

            },

            async setGoogleCat(index, level, val, auto) {
                //用户解决 select change 触发两次的bug
                let cc = this.seletDbClick
                if (cc[0] == index && cc[1] == level && cc[2] == val) {
                    return
                } else {
                    this.seletDbClick = [index, level, val]
                }

                if (index) {
                    level == 0 && (this.expandProp.googleCategoryId0 = val + '')

                    await this.getGoogleCategory(this['googleCategoryId' + level], index)

                    if (!auto) {
                        this['googleCategoryId' + (Number(level)+1)] = undefined
                        this['goocat_' + (Number(level)+1)] = this.googleCat[index].length ? (level == 1 && !val)? !1: !0 : !1
                        level == 0 && (this.goocat_2 = !1)
                    }
                    level == 0 && (this.showApparel = val == 166? !0: !1)
                }

                //给返回后端的参数 googleCategoryId 赋值
                this.expandProp.googleCategoryId = this['googleCategoryId' + level]
            },

            setSubmitBtnText() {
                this.submitBtnTextIndex = ['1', '3', '4'].indexOf(this.row.putStatus) > -1? 1: 0
            },

            echoGoogleCat() {
                let c = this.googleProductCategory.shift(),
                    m = ['one', 'two', 'three'],
                    i = this.googleProductCategoryIndex++


                let list = this.googleCat[m[i]]
                for (let j in list) {
                    if (list[j].category == c.trim()) {
                        this['googleCategoryId' + i] = list[j].id
                        this['goocat_' + i] = !0
                        this.setGoogleCat(m[parseInt(i) + 1], i, list[j].id, 'auto')
                    }
                }
            },

            //打开之前的一些操作
            expandRow(row) {
                //if (oldExpandRow = this.expandedRow) {
                let icon = this.$refs.proListRef.$el.getElementsByClassName('edit_box'),
                        len = icon.length

                if (len !== 2) {
                    for (var i = 0; i < len; i++) {
                        let ii = icon[i]
                        if (ii.getAttribute('xref') != row.pk) {
                            let el = ii.parentElement.parentElement.previousElementSibling.getElementsByClassName("nt-table__expand-icon--expanded")[0]
                            el.click()
                            break;
                        }
                    }
                }
            },

            removePdtImg: function(info){
                this.multiUrls = info[1]
            }
        },

        watch: {
            multiUrls() {
                this.expandProp.proImages = this.multiUrls.length? 'a': ''
                //console.log(proImages)
                this.showUploadPic = this.multiUrls.length === 5 ? !1 : !0
            }
        },

        created() {
            this.getDetailByPk()
        },
        
        components: {
            AvatarUpload
        }
    }
</script>