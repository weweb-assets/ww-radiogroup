<template>
    <wwSimpleLayout role="radiogroup">
        <Item
            v-for="(item, index) in content.items"
            :key="index"
            :item="item"
            :index="index"
            :container="content.itemContainer"
            :selectedValue="selectedValue"
            :valueFormula="content.valueFormula"
            @update:selectedValue="setSelectedValue($event)"
        ></Item>
    </wwSimpleLayout>
</template>

<script>
import Item from './Item.vue';
import { provide, computed } from 'vue';

export default {
    components: { Item },
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    emits: ['add-state', 'remove-state'],
    setup(props) {
        provide(
            '_wwRadioName',
            computed(() => props.content.name || props.wwElementState.name || `radio-${props.wwElementState.uid}'}`)
        );
        const { value: selectedValue, setValue: setSelectedValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.wwElementState.uid,
            name: 'value',
            type: 'any',
            defaultValue: computed(() => props.content.value),
        });

        return { selectedValue, setSelectedValue };
    },
};
</script>
