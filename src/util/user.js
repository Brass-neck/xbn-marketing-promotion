class User {
	constructor() {
		this.init()
	}

	init() {
		this.setUserId()
	}

	setUserId() {
		let token = localStorage.getItem('xbn.auth.token')
		if (token) {
			let id = new Buffer(token, 'base64').toString().match(/[0-9]{18}/)[0]
			localStorage.setItem('userId', id)
		}
	}
}

new User()
//Vue.prototype.__user = new User(new Vue())
//export default User
