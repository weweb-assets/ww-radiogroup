export default {
    editor: {
        label: 'Radio Group',
        icon: 'radio',
        bubble: true,
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
        ['value', 'name'],
        ['fieldName', 'customValidation', 'validation'],
        'readonly',
        'required',
    ],
    properties: {
        children: {
            label: {
                en: 'Items',
                fr: 'Items',
            },
            type: 'Repeat',
            options: {
                text: { en: 'Radio elements to repeat' },
            },
            hidden: (content, sidePanelContent, boundProps, wwProps) =>
                !!(wwProps && wwProps.isFixed) || wwProps.noDropzone,
            bindable: 'repeatable',
            defaultValue: [],
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
                tooltip:
                    'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        value: {
            type: 'Text',
            label: 'Initial value',
            section: 'settings',
            bindable: true,
            defaultValue: '',
        },
        name: {
            type: 'Text',
            label: 'Radio group name',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            propertyHelp: {
                tooltip: 'HTML name attribute for the radio group. If empty, a unique name will be generated.',
            },
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
                tooltip: 'A boolean that defines if all radios are readonly: `true | false`',
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
                tooltip: 'A boolean that defines if selecting a value is required: `true | false`',
            },
            /* wwEditor:end */
        },
        fieldName: {
            label: 'Field name',
            section: 'settings',
            type: 'Text',
            defaultValue: '',
            bindable: true,
        },
        customValidation: {
            label: 'Custom validation',
            section: 'settings',
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
        },
        validation: {
            label: 'Validation',
            section: 'settings',
            type: 'Formula',
            defaultValue: '',
            bindable: false,
            hidden: (content) => !content.customValidation,
        },
    },
};