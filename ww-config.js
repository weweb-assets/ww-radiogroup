export default {
    editor: {
        label: 'Radio group',
        icon: 'radio',
        bubble: true,
    },
    inherit: {
        type: 'ww-layout',
    },
    options: {
        autoByContent: true,
        layout: ['flex', 'grid'],
    },
    states: ['readonly'],
    properties: {
        items: {
            label: 'Items',
            type: 'Info',
            options: {
                text: { en: 'Elements to repeat' },
            },
            settings: true,
            bindable: true,
            defaultValue: [1, 2, 3],
        },
        valueFormula: {
            type: 'Formula',
            label: 'Value per item',
            options: content => ({
                template: Array.isArray(content.items)
                    ? { item: content.items[0], index: 0 }
                    : { item: null, index: 0 },
            }),
            settings: true,
            defaultValue: { type: 'f', code: "context.mapping?.['item']" },
        },
        value: {
            type: 'Text',
            label: 'Initial value',
            settings: true,
            bindable: true,
        },
        name: {
            type: 'Text',
            label: 'Name',
            settings: true,
            bindable: true,
        },
        itemContainer: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-flexbox', name: 'Item' },
        },
    },
};
