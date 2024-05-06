<template>
    <wwLayoutItemContext is-repeat :index="index" :data="data">
        <wwElement v-bind="container" @click="select" role="radio" :aria-checked="isSelected" tag="label"></wwElement>
    </wwLayoutItemContext>
</template>

<script>
import { toRef, provide, computed, reactive } from 'vue';
export default {
    props: {
        container: { type: Object, required: true },
        selectedValue: { type: undefined, required: true },
        index: { type: Number, required: true },
        item: { required: true },
        valueFormula: { type: String, required: true },
        readonly: { type: Boolean, required: true },
    },
    emits: ['update:selectedValue'],
    setup(props, context) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const value = computed(() =>
            resolveMappingFormula(props.valueFormula, { item: props.item, index: props.index })
        );
        const isSelected = computed(() => props.selectedValue === value.value);

        provide('_wwRadioIsChecked', isSelected);
        provide('_wwRadioValue', value);

        function select() {
            if (props.readonly) return;
            context.emit('update:selectedValue', value.value);
        }

        const data = reactive({
            item: toRef(props, 'item'),
            value,
            isSelected,
            methods: { select },
        });

        provide('_wwRadioSelect', select);

        return { select, data, isSelected };
    },
};
</script>
