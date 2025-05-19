export default {
    editor: {
        label: 'Radio Group',
        icon: 'radio',
        bubble: true,
        hint: (_, sidepanelContent) => {
            if (sidepanelContent.hasDuplicateValues) {
                return {
                    type: 'warning',
                    header: 'Duplicate Values',
                    text: 'Radio Items values must be unique.',
                };
            }
            return null;
        },
    },
    inherit: {
        type: 'ww-layout',
    },
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'grid', 'inline-flex', 'inline-grid'],
    },
    states: ['readonly'],
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    customSettingsPropertiesOrder: [
        'formInfobox',
        ['fieldName', 'customValidation', 'validation'],
        ['value', 'name'],
        ['items', 'valueFormula', 'readonlyFormula'],
        'readonly',
        'required',
        'isSelectOnClick',
    ],
    properties: {
        /* wwEditor:start */
        form: {
            editorOnly: true,
            hidden: true,
            defaultValue: false,
        },
        formInfobox: {
            type: 'InfoBox',
            section: 'settings',
            options: (_, sidePanelContent) => ({
                variant: sidePanelContent.form?.name ? 'success' : 'warning',
                icon: 'pencil',
                title: sidePanelContent.form?.name || 'Unnamed form',
                content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
            }),
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form;
            },
        },
        /* wwEditor:end */
        fieldName: {
            label: 'Field name',
            section: 'settings',
            type: 'Text',
            defaultValue: '',
            bindable: true,
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form?.uid;
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the field name: `"otp_code"`',
            },
            /* wwEditor:end */
        },
        customValidation: {
            label: 'Custom validation',
            section: 'settings',
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form?.uid;
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean value',
            },
            /* wwEditor:end */
        },
        validation: {
            label: 'Validation',
            section: 'settings',
            type: 'Formula',
            defaultValue: '',
            bindable: true,
            hidden: (content, sidePanelContent) => {
                return !sidePanelContent.form?.uid || !content.customValidation;
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean formula for validation',
            },
            propertyHelp: {
                tooltip: 'Return true if the field is valid, false otherwise',
            },
            /* wwEditor:end */
        },
        itemElement: {
            hidden: true,
            isArray: false,
            defaultValue: { isWwObject: true, type: 'ww-flexbox' },
        },
        value: {
            type: 'Text',
            label: 'Initial value',
            settings: true,
            bindable: true,
        },
        name: {
            type: 'Text',
            label: 'Radio name',
            settings: true,
            bindable: true,
        },
        items: {
            label: {
                en: 'Items',
            },
            type: 'ObjectList',
            options: {
                useSchema: true,
            },
            bindable: true,
            defaultValue: [],
            settings: true,
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip: 'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...]`',
            },
            /* wwEditor:end */
        },
        valueFormula: {
            type: 'Formula',
            label: 'Value (per item)',
            options: content => ({
                template: Array.isArray(content.items)
                    ? { item: content.items[0], index: 0 }
                    : { item: null, index: 0 },
            }),
            settings: true,
        },
        readonlyFormula: {
            type: 'Formula',
            label: 'Read only (per item)',
            options: content => ({
                template: Array.isArray(content.items)
                    ? { item: content.items[0], index: 0 }
                    : { item: null, index: 0 },
            }),
            settings: true,
        },
        readonly: {
            label: { en: 'Read only', fr: 'Lecture seule' },
            type: 'OnOff',
            bindable: true,
            defaultValue: false,
            settings: true,
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
            bindable: true,
            defaultValue: false,
            settings: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is in readonly: `true | false`',
            },
            /* wwEditor:end */
        },
        isSelectOnClick: {
            label: { en: 'Select on click' },
            type: 'OnOff',
            bindable: true,
            defaultValue: true,
            settings: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is automatically selected on click: `true | false`',
            },
            /* wwEditor:end */
        },
    },
};
