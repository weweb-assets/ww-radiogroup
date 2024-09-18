<template>
    <wwLayoutItemContext is-repeat :index="index" :data="data">
        <wwElement v-bind="container" @update:itemValue="updatedItemValue" />
    </wwLayoutItemContext>
</template>

<script>
import { ref, provide, inject, reactive, computed } from 'vue';
export default {
    props: {
        container: { type: Object, required: true },
        index: { type: Number, required: true },
        item: { required: true },
        readonly: { type: Boolean, required: true },
    },
    emits: ['update:selectedValue'],
    setup(props, context) {
        const itemValue = ref(undefined);
        const selectedValue = inject('_wwRadioSelectedValue');

        function select() {
            if (props.readonly) return;
            context.emit('update:selectedValue', itemValue.value);
        }

        function updatedItemValue(value) {
            itemValue.value = value;
        }

        const isSelected = computed(() => selectedValue.value === itemValue.value);

        const data = reactive({
            radiogroupValue: selectedValue.value,
            isSelected,
            methods: { select },
        });

        provide('_wwRadioIsChecked', isSelected);
        provide('_wwRadioSelect', select);

        return { select, data, updatedItemValue };
    },
};
</script>
