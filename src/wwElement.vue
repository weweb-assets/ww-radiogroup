<template>
    <div role="radiogroup" :aria-required="content.required" :aria-readonly="content.readonly" class="ww-radiogroup">
        <wwLayout path="children" />
    </div>
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

        const { registeredRadios, selectedValue, radioValues, hasDuplicateValues, duplicateValues } = useRadioProvider(
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

        /* wwEditor:start */
        // Update sidepanel content with radio group state
        watch(
            [registeredRadios, hasDuplicateValues, duplicateValues],
            () => {
                const registeredRadiosList = [];
                for (const [uid, valueRef] of registeredRadios.value.entries()) {
                    registeredRadiosList.push({
                        uid,
                        value: unref(valueRef),
                    });
                }

                emit('update:sidepanel-content', {
                    path: 'radiogroupState',
                    value: {
                        registeredRadios: registeredRadiosList,
                        hasDuplicateValues: hasDuplicateValues.value,
                        duplicateValues: duplicateValues.value,
                        form: form
                            ? {
                                  uid: form.uid,
                                  name: form.name?.value,
                              }
                            : null,
                    },
                });
            },
            { immediate: true, deep: true }
        );
        /* wwEditor:end */

        return {
            modelValue,
            setValue,
        };
    },
};
</script>

<style scoped>
.ww-radiogroup {
    display: flex;
}

.ww-radiogroup > :deep(div) {
    flex-grow: 1;
}
</style>
