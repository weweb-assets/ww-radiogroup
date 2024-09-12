<template>
    <wwLayoutItemContext is-repeat :index="index" :data="data">
        <wwElement v-bind="container" :selected-value="selectedValue" />
    </wwLayoutItemContext>
</template>

<script>
import { toRef, provide, reactive } from 'vue';
export default {
    props: {
        container: { type: Object, required: true },
        selectedValue: { type: undefined, required: true },
        index: { type: Number, required: true },
        item: { required: true },
        readonly: { type: Boolean, required: true },
    },
    emits: ['update:selectedValue'],
    setup(props, context) {
        function select() {
            if (props.readonly) return;
            context.emit('update:selectedValue', value.value);
        }

        const data = reactive({
            item: toRef(props, 'item'),
            value: props.selectedValue,
            methods: { select },
        });

        provide('_wwRadioSelect', select);

        return { select, data };
    },
};
</script>
