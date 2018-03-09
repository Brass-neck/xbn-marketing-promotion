import Vue from 'vue'

Vue.prototype.crates = function (text) {
    let oul = document.querySelector('.pop-menu');
    let oli = document.createElement('li');
    let oi = document.createElement('i');
    let ospan = document.createElement('span');
    let alter = oul.childNodes[2];

    ospan.innerHTML = text;
    //oli.classList.add('menu-text', 'infod');
    //oi.classList.add('nt-icon-xbn-38', 'curpointer', 'vM');
    oli.appendChild(oi);
    oli.appendChild(ospan);
    oul.insertBefore(oli, alter);

};


