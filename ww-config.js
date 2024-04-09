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
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        items: {
            label: 'Items',
            type: 'ObjectList',
            options: {
                useSchema: true,
            },
            settings: true,
            bindable: true,
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
        readonly: {
            label: { en: 'Read only', fr: 'Lecture seule' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is in readonly: `true | false`',
            },
            /* wwEditor:end */
        },
        required: {
            label: { en: 'Required' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is in readonly: `true | false`',
            },
            /* wwEditor:end */
        },
        itemContainer: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-flexbox', name: 'Item' },
        },
    },
};
