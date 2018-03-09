<template>
	
	<div class="add-ad">
		<page-head title="广告管理" ref="head"></page-head>
		<div class="operationBox" ref="operBox" :class="{'top-fixed': oprFixed}">
			<div class="nt-row">
				<div class="nt-col nt-col-12"><a href="javascript:;" @click="cancle" class="col_57595b f16"><i
						class="nt-icon-arrow-left f14 mR10" ></i>创建广告</a></div>
				<div class="tR nt-col nt-col-12">
					<nt-popover width="220" v-model="showBalancePop" ref="balancePop">
						<p>您的账户余额不足，请先充值。</p>
						<div class="popoverBtn">
			                <nt-button type="primary" size="small" @click="showBalancePop = !1, showPay = !0">去充值</nt-button>
			                <nt-button size="small" type="primary" @click="showBalancePop = !1">稍后再说</nt-button>
						</div>
					</nt-popover>
					<div v-popover:balancePop class="save-btn-ref"></div>
					<button type="button" class="nt-button nt-button--primary" @click="save"><!----> <!----> <span>保存</span></button>
					<button type="button" class="nt-button nt-button--primary" @click="cancle"><!----> <!----> <span>取消</span></button>
				</div>
			</div>
		</div>
		<div class="operationBox" :style="{display: oprFixed? 'block':'none'}"></div>
		<div class="contentBox" ref="addAdBox">
			<div class="border_layout competing_infor">
				<div class="competing_infor_title nt-row">
					<div class="fb nt-col nt-col-24">Step1 填写广告信息</div>
				</div>
				<div class="competing_infor_main">
					<template>
						<nt-form
								ref="adForm"
								:model="model"
								:rules="rules"
								label-width="122px"
								class="set-new-email">
							<nt-form-item label="广告名称：" prop="name">
								<nt-input v-model="model.name" class="w240" :maxlength="adNameMaxL"></nt-input>
							</nt-form-item>
							<nt-form-item label="每天预算：" prop="budget">
								<nt-input v-model="model.budget" @keyup.native="budgetKeyup" @blur="budgetBlur" ref="budget" class="w240 fL"></nt-input>
								<span class="mL5">元</span>
								<nt-tooltip placement="top" ref="noticeAdd1" trigger="hover" :content="noticeAdd1">
									<div slot="content" v-text="noticeAdd1"></div>
									<i class="nt-icon-xbn-19 col_f8ac59 f16 vM-2 mL10"></i>
								</nt-tooltip>
								
								<span class="col_cccccc mL10">每天实际支出可能会上下波动20%。</span>
								<nt-tooltip placement="top" width="200" ref="noticeAdd2" trigger="hover">
									<div slot="content" v-html="noticeAdd2" style="width: 260px;"></div>
									<i class="nt-icon-xbn-19 col_f8ac59 f16 vM-2 mL10"></i>
								</nt-tooltip>
							</nt-form-item>
							<nt-form-item label="投放国家：" prop="country">
								<nt-select
										v-model="model.country"
										placeholder="美国"
										disabled
										class="w240 fL">
									<nt-option
											v-for="item in model.countrys"
											:key="item.key"
											:label="item.label"
											:value="item.value">
									</nt-option>
								</nt-select>
								<!-- <nt-input inputtype="password" v-model="model.country" class="budget-input"></nt-input> -->

								<nt-tooltip placement="top" width="200" ref="noticeAdd3" trigger="hover" :content="noticeAdd7">
									<div slot="content" v-text="noticeAdd7"></div>
									<i class="nt-icon-xbn-19 col_f8ac59 f16 vM-2 mL10"></i>
								</nt-tooltip>
							</nt-form-item>
						</nt-form>
					</template>
				</div>
			</div>
			<div class="competing_infor mT20">
				<div class="competing_infor_title nt-row">
					<div class="fb nt-col nt-col-24">Step2  添加投放商品<span class="col_cccccc">（为了更好的广告效果，建议添加价格相近的商品）</span></div>
				</div>
				<ad-pro type="add"></ad-pro>
			</div>
		</div>

		<nt-dialog
            title="线上充值"
            class="dialog-width-auto"
            :visible.sync="showPay">
            <pay :cancelFun="payCancle" :sucCallBack="paySuccess" :errorCallBack="payErr" :payConfig="{}">
            	 <span slot="content" class="vT">
            	 	<span>元</span>
                    <nt-tooltip class="item opera_btn vM" effect="dark" content="详情" placement="top">
                        <span slot="content" v-text="noticeAdd8"></span>
                        <i class="nt-icon-xbn-19 col_f8ac59 f16 vM-2 mL10"></i>
                    </nt-tooltip>
                </span>
            </pay>
        </nt-dialog>
	</div>

</template>

<script type="text/javascript">
	import {PageHead, TemplateSearchList} from 'xbn-biz-components'
	import SimpleList from '../common/list.vue'
	import AdPro from './_pro.vue'
	import CONSTANTS from '../../config/adStrategy/const'
	import STATUSCODE from '../../config/statusCode'
	import BIZ from 'xbn-biz-common'
	import Base64 from 'base64-js'

	export default {
		props: {
			rules: {
				type: Object,
				default() {
					return {
						name: [
							{required: true, message: '此项为必填', trigger: 'blur'},
							{
								validator: async (rule, value, callback) => {
									if (!value) callback()
									let res = await this.adModel.adNameRepeat(encodeURIComponent(value), this.ctx)

									if (res.statusCode == STATUSCODE.SUCCESS) {
										res.data == '1'? callback('广告名称已存在，请修改。'): callback()
	                                } else {
	                                    callback()
	                                    this.$alert('服务出错')
	                                }
								}
							}
						], budget: [
							{required: true, message: '此项为必填', trigger: 'blur'},
							{max: 13, message: '最多为13位', trigger: 'blur'},
							{
								validator(rule, value, callback) {
									value == 0? callback('每天预算须大于0'): callback()
								}
							}
							/*{
								validator: async(rule, value, callback) => {
									let balance = await this.payModel.getPayInfo(1, this.ctx)
			                		if (balance.data.vailableBalance < value * 1.2) {
			                			this.$confirm('余额不足请充值', '', {
			                				confirmButtonText: '去充值',
			          						cancelButtonText: '取消'
										}).then(() => {
											this.showPay = !0
										})
			                			callback('')
			                		} else {
			                			callback()
			                		}
								},
								message: '余额不足请充值',
								trigger: 'blur'
							}*/
						], country: [
							{required: true, message: '请输入投放国家', trigger: 'blur'}
						]
					}
				}
			},
			proRules: {
				type: Object,
				default() {
					return {
						asin: [
							{required: true, message: '请输入商品ASIN', trigger: 'blur'},
							{
								validator: async (rule, value, callback) => {
									if (!value) callback()
									let res = await this.adModel.asinUnique(value, this.ctx)
									//TODO
									if (res.statusCode == STATUSCODE.SUCCESS && res.data[0]) {
	                                    callback()
	                                } else {
	                                    callback('asin已被占用')
	                                }
								}
							}
						], country: [
							{required: true, message: '请输入旧密码', trigger: 'blur'}
						]
					}
				}
			}
		},

		data() {
			return {
                oprFixed: false,
				model: {
					countrys: [{
			          value: '0',
			          label: '美国'
			        }],
			        country: '美国'
				},
				product: {
					country: 'am'
				},
				showBalancePop: !1,
				showPay: !1,
				adNameMaxL: 50,
				noticeAdd1: CONSTANTS.notice.noticeAdd1,
				noticeAdd2: CONSTANTS.notice.noticeAdd2,
				noticeAdd7: CONSTANTS.notice.noticeAdd7,
				noticeAdd8: CONSTANTS.notice.noticeAdd8,
				adModel: this.ctx.models.MarketingModel.ad,
				payModel: this.ctx.models.MarketingModel.pay
			}
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
                this.$alert({
                    message: '服务出错，请联系客服'
                })
                this.showPay = !1
            },

            aaa(a, b, c) {
            	debugger
            },

			save() {
				this.$refs.adForm.validate(async (valid) => {
					if (valid) {
						let param = {
							campaignName: this.model.name,
							budget: this.model.budget,
							salesCountry: 'US',//this.model.country,
							userId: 1,
							biddingStrategy: '0'
						}

						if (await this.checkBalanceEnough(param.budget)) {
							this.showBalancePop = !0
							return
						}
						let products = []
						this.$children[3].launchedProductTotal.forEach(i => {
							products.push({
								pk: i.pk, 
								productId: i.productId, 
								status: i.status, 
								userId: 1
							})
						})
						products.length && (param.products = products)

						let res = await this.adModel.addAd(param, this.ctx)
						if (res.statusCode == STATUSCODE.SUCCESS) {
							this.$message({
								message: '广告添加成功',
								type: 'success',
								showClose: true
							})
							this.cancle()
						} else {
							this.$alert('出错了')
						}
					}
				})
			},

			async checkBalanceEnough(value) {
				let res = await this.adModel.budgetSupported(value, this.ctx)
				if (res.statusCode == STATUSCODE.SUCCESS) {
					return !res.data[0]
				} else {
					this.$alert('出错了')
				}
			},

			/*async checkBalanceEnough1(eve, value) {
				let balance = await this.payModel.getPayInfo(localStorage.getItem('userId'), this.ctx),
					enough  = !0

        		if (balance.data.vailableBalance < value * 1.2) {
        			this.showBalancePop = !0
        			enough = !1
        		}

        		return enough
			},*/

			setScrollBoxHeight() {
                let height = document.body.offsetHeight - 3 - 120 - 50
                this.$refs.addAdBox && (this.$refs.addAdBox.style.height = height + 'px')
            },

            /*budgetInput(val) {
            	let v = `${val}`
            	let l =  v.indexOf('.') > -1? (v.split('.')[0].substr(0, 10) + '.' + v.split('.')[1].substr(0, 2)): v.substr(0, 10)
            	setTimeout(() => {
            		//如果是科学计数法，需要将其清除
            		l === '' && (l = ' ')
            		this.model.budget = l
            	}, 10)

            },*/

            budgetKeyup(val) {
            	let v =  val.target.value.replace(/[^\d*.*]/g, '')//`${val}`
            	let l =  v.indexOf('.') > -1? (v.split('.')[0].substr(0, 10) + '.' + v.split('.')[1].substr(0, 2)): v.substr(0, 10)
            	/*setTimeout(() => {
            		//如果是科学计数法，需要将其清除
            		l === '' && (l = ' ')
            		this.model.budget = l
            	}, 10)*/
				this.model.budget = l
            },

            budgetBlur() {
            	let l = Number(this.model.budget),
            		v = (l + '').split('.')[1]

            	if (v) {
            		v.length === 1 && (this.model.budget = l + '0')
            	} else {
            		l > 0 && (this.model.budget = l + '.00')
            	}
            },

			cancle() {
				this.$router.back()//replace('/ad-strategy')
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
            //this.setStatusNoticePosition()
            //this.setScrollBoxHeight()
            //window.addEventListener('resize', this.setScrollBoxHeight)
            document.addEventListener('scroll',this.handleScroll)
        },
        destroyed() {
            document.removeEventListener('scroll',this.handleScroll)
        },
		components: {
			PageHead,
			TemplateSearchList,
			SimpleList,
			AdPro,
			Pay: BIZ.components.pay
		}
	}
</script>

<style type="text/css" lang="less">
	.ope-btns {
		display: inline-block;
    	float: right;
	}
	.budget-input {
		width: 246px;
	}
	.notice {
		vertical-align: -3px;
		margin: 0 6px;
	}
	.marketing-main {
		.nt-dropdown {
			> button {
				    width: 242px;
				    text-align: left;
				    background-color: #fff;
				    color: #cfcfcf;
				    border: 1px solid #bfc6d9;

				    .nt-icon-caret-bottom {
				    	float: right;
				    }
			}
		}
	}
	.nt-dropdown-menu {
		width: 242px;
	}
	.add-product-box-notice {
		margin: 0 0 16px 60px;
	}
	.nt-message-box__wrapper {
		z-index: 22;
	}
	.add-ad .operationBox{
		box-shadow: none;
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
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	}
	.save-btn-ref {
		position: absolute;
		right: 94px;
	    width: 80px;
	    height: 36px;
	    top: 8px;
	    z-index: -1;
	}
</style>