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
        displayAllowedValues: ['flex', 'grid'],
    },
    states: ['readonly'],
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        slot: {
            hidden: true,
            defaultValue: [],
        },
        items: {
            label: 'Items',
            type: 'Info',
            settings: true,
            bindable: true,
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
        // itemContainer: {
        //     hidden: true,
        //     defaultValue: { isWwObject: true, type: 'e081a0e1-0a3f-493a-916d-357bdef10b82', name: 'Radiogroup item' },
        // },
    },
};
