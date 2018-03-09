let FILTER = {
    quick:{
        googleCategoryRoot : {
            'key': 'googleCategoryRoot',
            'label': 'Google分类',
            'size': 'large',
            'options': []
        },

        putStatus:{
            'key': 'putStatus',
            'label': '商品状态',
            'size': 'medium',
            'options': []
        },

        createDateNum:{
            'key': 'createDateNum',
            'label': '创建时间',
            'size': 'small',
            'options': [
                {'id': 1, 'value': -1, 'label': '全部'},
                {'id': 2, 'value': 3, 'label': '近3天'},
                {'id': 3, 'value': 7, 'label': '近7天'},
                {'id': 4, 'value': 15, 'label': '近15天'},
                {'id': 5, 'value': 30, 'label': '近1月'}
            ]
        },

        shopId:{
            'key': 'shopId',
            'label': '店铺名称',
            'size': 'large',
            'options': []
        }
    },

    comboSearch:{
        asin:{
            'key': 'asin',
            'line': true,
            'label': 'ASIN',
            'type': 'input'
        },
        googleCategoryRoot:{
            'key': 'googleCategoryRoot',
            'line': true,
            'label': '分类',
            'type': 'select',
            'options': []
        },
        title:{
            'key': 'title',
            'line': true,
            'label': '商品标题',
            'type': 'input'
        },
        productPrice:{
            'key': 'productPrice',
            'label': '价格',
            'type': 'numberquery'
        },
        createDate:{
            'key': 'createDate',
            'label': '创建时间',
            'type': 'timequery'
        },
        advertisingStrategy:{
            'key': 'advertisingStrategy',
            'line': true,
            'label': '广告名称',
            'type': 'input'
        },
        putStatus:{
            'key': 'putStatus',
            'line': true,
            'label': '状态',
            'options': [],
            'type': 'select'
        }
    }

}

export default FILTER
