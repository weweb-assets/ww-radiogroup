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
        'radiogroupInfobox',
        ['value', 'name'],
        ['fieldName', 'customValidation', 'validation'],
        'readonly',
        'required',
    ],
    properties: {
        children: {
            hidden: true,
            defaultValue: [],
        },
        radiogroupState: {
            editorOnly: true,
            hidden: true,
            defaultValue: {
                registeredRadios: [],
                hasDuplicateValues: false,
                duplicateValues: [],
            },
        },
        radiogroupInfobox: {
            type: "InfoBox",
            section: "settings",
            options: (_, sidePanelContent) => {
                const state = sidePanelContent.radiogroupState || {};
                const radioCount = state.registeredRadios?.length || 0;
                const hasDuplicates = state.hasDuplicateValues;
                const duplicates = state.duplicateValues || [];
                const inForm = !!state.form?.uid;
                const formName = state.form?.name;
                
                let variant = "info";
                let title = `${radioCount} radio${radioCount !== 1 ? 's' : ''} registered`;
                let content = "";
                
                if (radioCount === 0) {
                    variant = "warning";
                    title = "No radios registered";
                    content = "Add radio inputs inside this group to create options.";
                } else if (hasDuplicates) {
                    variant = "error";
                    content = `⚠️ Duplicate values detected: ${duplicates.join(', ')}. Each radio must have a unique value.`;
                } else if (radioCount === 1) {
                    variant = "warning";
                    content = "Only one radio registered. Add more options for a functional radio group.";
                } else if (inForm && formName) {
                    // All good - in form with multiple radios
                    variant = "success";
                    title = formName;
                }
                
                return {
                    variant,
                    icon: "radio",
                    title,
                    content,
                };
            },
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