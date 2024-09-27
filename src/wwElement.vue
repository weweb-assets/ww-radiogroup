<template>
    <wwLayout role="radiogroup" path="items" />
</template>

<script>
import { provide, computed } from 'vue';
/* wwEditor:start */
import useRadiogroupHint from './editor/useRadiogroupHint';
/* wwEditor:end */

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
        useRadiogroupHint(emit);
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

        return { selectedValue, setSelectedValue };
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
