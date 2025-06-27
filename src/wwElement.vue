<template>
    <fieldset :id="inputId" :aria-required="content.required" :aria-readonly="content.readonly" class="ww-radiogroup">
        <wwLayout path="children" />
    </fieldset>
</template>

<script>
import { computed, inject, watch, unref } from 'vue';
import { useRadioProvider } from './composables/useRadioProvider';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['add-state', 'remove-state', 'update:content', 'update:sidepanel-content', 'trigger-event'],
    setup(props, { emit }) {
        // Use WeWeb's component variable for value management
        const { value: modelValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.wwElementState.uid,
            name: 'value',
            type: 'any',
            defaultValue: computed(() => props.content.value),
        });

        const { registeredRadios, selectedValue, radioValues, hasDuplicateValues, duplicateValues, inputId } = useRadioProvider(
            props,
            emit,
            setValue
        );

        // Sync internal selectedValue with component variable
        watch(modelValue, newValue => {
            selectedValue.value = newValue;
        });

        // Watch for external value changes
        watch(
            () => props.content.value,
            newValue => {
                if (newValue !== modelValue.value) {
                    setValue(newValue);
                    emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
                }
            }
        );

        // Form integration
        const form = inject('_wwForm:info', null);
        const useForm = inject('_wwForm:useForm', () => {});

        const fieldName = computed(() => props.content.fieldName);
        const validation = computed(() => props.content.validation);
        const customValidation = computed(() => props.content.customValidation);
        const required = computed(() => props.content.required);

        useForm(
            modelValue,
            {
                fieldName,
                validation,
                customValidation,
                required,
                initialValue: computed(() => props.content.value),
            },
            {
                elementState: props.wwElementState,
                emit,
                setValue,
            }
        );

        // Update readonly state
        watch(
            () => props.content.readonly,
            isReadonly => {
                if (isReadonly) {
                    emit('add-state', 'readonly');
                } else {
                    emit('remove-state', 'readonly');
                }
            },
            { immediate: true }
        );


        // Create local context data
        const localData = computed(() => ({
            selectedValue: modelValue.value,
            hasSelection: modelValue.value !== null && modelValue.value !== undefined && modelValue.value !== '',
        }));
        
        // Markdown documentation
        const markdown = `
## Radio Group Local Context

This radio group exposes the following data through local context:

### Data:
- **selectedValue**: The currently selected radio value
- **hasSelection**: Boolean indicating if a radio is selected

### Usage:
Access this context in child elements using the key 'radiogroup'
        `;
        
        // Register local context
        wwLib.wwElement.useRegisterElementLocalContext(
            'radiogroup',
            localData,
            {},  // No methods
            markdown
        );

        return {
            modelValue,
            setValue,
            inputId,
        };
    },
};
</script>

<style scoped>
.ww-radiogroup {
    appearance: none;
    display: flex;
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0; /* Fix for fieldset min-width in some browsers */
}

.ww-radiogroup > :deep(div) {
    flex-grow: 1;
}
</style>
