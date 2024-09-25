<template>
    <wwLayout role="radiogroup" path="items" />
</template>

<script>
import { reactive, provide, computed, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['add-state', 'remove-state', 'update:sidepanel-content'],
    setup(props, { emit }) {
        /* wwEditor:start */
        const radioItems = reactive({});
        function registerRadioItem(id, value) {
            radioItems[id] = value;
        }
        function unregisterRadioItem(id) {
            delete radioItems[id];
        }

        watch(
            radioItems,
            value => {
                const isDuplicateItemValues = new Set(Object.values(radioItems)).size !== value.length;
                emit('update:sidepanel-content', {
                    path: 'isDuplicateItemValues',
                    value: isDuplicateItemValues,
                });
            },
            { deep: true, immediate: true }
        );

        provide('_wwRadioRegisterItem', registerRadioItem);
        provide('_wwRadioUnregisterItem', unregisterRadioItem);
        provide('_wwRadioItems', radioItems);
        /* wwEditor:end */

        provide(
            '_wwRadioName',
            computed(() => props.content.name || props.wwElementState.name || `radio-${props.wwElementState.uid}'}`)
        );
        provide(
            '_wwRadioIsReadonly',
            computed(() => props.content.readonly)
        );
        provide(
            '_wwRadioIsRequired',
            computed(() => props.content.required)
        );
        const { value: selectedValue, setValue: setSelectedValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.wwElementState.uid,
            name: 'value',
            type: 'any',
            defaultValue: computed(() => props.content.value),
        });
        provide('_wwRadioSetSelectedValue', setSelectedValue);
        provide('_wwRadioSelectedValue', selectedValue);

        return { selectedValue, setSelectedValue, radioItems };
    },
    watch: {
        'content.value'(newValue) {
            if (newValue === this.value) return;
            this.setSelectedValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
    methods: {
        onChange(newValue) {
            if (newValue === this.selectedValue) return;
            this.setSelectedValue(newValue);
            this.$emit('trigger-event', { name: 'change', event: { value: newValue } });
        },
    },
};
</script>
