module.exports = [
    {
    type: 'item',
    isHeader: true,
    name: 'Main Navigation'
    },
    {
        type: 'item',
        icon: 'fa fa-home',
        name: 'Dashboard',
        router: {
            name: 'Dashboard'
        }
    },
    {
        type: 'tree',
        icon: 'fa fa-gift',
        name: 'Products',
        items: [
            {
            type: 'item',
            name: 'List Products',
            icon: 'fa fa-circle-o',
            router: {
                name: 'Products'
            }
        },
        {
            type: 'item',
            name: 'Create Product',
            icon: 'fa fa-plus',
            router: {
                name: 'CreateProduct'
            }
        }
    ]
    },
    {
        type: 'item',
        isHeader: true,
        name: 'ORDER'
    },
    {
        type: 'tree',
        name: 'Orders',
        icon: 'fa fa-anchor',
        items: [
            {
                type: 'item',
                name: 'List Order',
                icon: 'fa fa-circle-o',
                router: {
                    name: 'Orders'
                }
            }
        ]
    },
    {
        type: 'tree',
        name: 'Resource',
        icon: 'fa fa-th',
        items: [
            {
                type: 'item',
                name: 'Sites & Webhooks',
                icon: 'fa fa-circle-o',
                router: {
                    name: 'Webhook'
                }
            }
         ]
    }
]