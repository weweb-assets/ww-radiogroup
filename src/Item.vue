<template>
    <wwLocalContext :data="localData" :methods="localMethods" elementKey="radioItem">
        <wwElement v-bind="element" @click="selectOnClick" role="radio" :aria-checked="isSelected"> </wwElement>
    </wwLocalContext>
</template>

<script>
import { ref, provide, inject, computed } from 'vue';

export default {
    props: {
        data: { type: undefined, required: true },
        index: { type: Number, required: true },
        element: { type: Object, required: true },
        selectedValue: { type: String, required: true },
        isSelectOnClick: { type: Boolean, required: true },
        isReadonly: { type: Boolean, required: true },
        valueFormula: { type: Object, required: true },
        readonlyFormula: { type: Object, required: true },
        isEditing: { type: Boolean, required: true },
    },
    emits: ['update:selectedValue'],
    setup(props, { emit }) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const value = computed(() =>
            resolveMappingFormula(props.valueFormula, { item: props.data, index: props.index })
        );
        const isReadonly = computed(
            () =>
                props.isReadonly ||
                resolveMappingFormula(props.readonlyFormula, { item: props.data, index: props.index })
        );
        const isSelected = computed(() => props.selectedValue === value.value);
        const clicked = ref(false);

        function select() {
            if (!isReadonly.value) {
                emit('update:selectedValue', value.value);
                clicked.value = true;
            }
        }

        function selectOnClick() {
            if (props.isEditing || !props.isSelectOnClick) return;
            select();
        }

        const localData = ref({
            isSelected,
            disabled: isReadonly,
            data: computed(() => props.data),
        });

        const localMethods = {
            select: {
                description: 'Selects the current radio item',
                method: select,
                editor: {
                    label: 'Select',
                    elementName: 'Radio Item',
                    icon: 'cursor-click',
                },
            },
        };

        function resetClicked() {
            clicked.value = false;
        }

        provide('_wwRadioItemClicked', clicked);
        provide('_wwRadioItemResetClicked', resetClicked);
        provide('_wwRadioItemValue', value);
        provide('_wwRadioIsChecked', isSelected);
        provide('_wwRadioIsDisabled', isReadonly);
        provide('_wwRadioSelect', select);

        return { isReadonly, isSelected, localData, localMethods, selectOnClick };
    },
};
</script>
