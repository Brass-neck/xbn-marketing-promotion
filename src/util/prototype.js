//这是一个往Vue.prototype上添加 功能的js
import Vue from 'vue'

function popover(msg) {
	//设置一个延后 是因为全局的绑定在后面
	setTimeout(() => {
		let html = `<div class="nt-popover" id="adPopover" style="display: none;">
						<p>${msg}</p>
						<div style="text-align: right; margin: 16px 0 0;">
							<button type="button" class="nt-button nt-button--primary ad-popover-btn"><span>取消</span></button>
							<button type="button" class="nt-button nt-button--primary ad-popover-btn"><span>确定</span></button>
						</div>
						<div x-arrow="" class="popper__arrow" style="top:-12px;left: 50%; border-bottom-color: #fff;"></div>
					</div>`,
			node = document.createElement('div')
		node.innerHTML = html
		!document.querySelector('#adPopover') && document.body.appendChild(node)

		let popover = document.querySelector('#adPopover'),
			event   = window.clickSourceEvent

		popover.style = 'min-width:220px;padding:18px;transform-origin:center bottom 0px;z-index:2144; left: '+ (event.left - 100) +'px; top: '+ (event.top + 6) +'px;'
	}, 50)
	
}

Vue.prototype.$popover = popover