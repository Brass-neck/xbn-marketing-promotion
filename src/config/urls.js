const base 		= 	'http://172.16.1.101:8080',
	  user 		= 	`${base}/v1.0/user`,
	  regist    = 	`${user}/reg`,
	  findPwd    = 	`${user}/findPwd`,
	  product    = 	`${base}/product`
const registUrls = {
	regist: regist,
	//sendVerifyCode: `${regist}/sendCode`,
	//checkVerifyCode: `${regist}/verifyCode`,
	sendActiveCode: `${regist}/sendCode`,
	checkActiveCode: `${regist}/verifyCode` 
}

const loginUrls = {
	login : `${user}/login`
}

const findPwdUrls = {
	findPwd : findPwd,
	sendCode : `${findPwd}/sendCode`,
	sendMail : `${findPwd}/sendMail`,
	verifyCode : `${findPwd}/verifyCode`,
	verifyMail : `${findPwd}/verifyMail`
}

const productUrls = {
	list : `${product}/findProductList`
}

export {
	registUrls,
	loginUrls,
	findPwdUrls,
	productUrls
}
