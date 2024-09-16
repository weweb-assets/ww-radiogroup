<template>
    <!-- <wwSimpleLayout role="radiogroup">
        <Item
            v-for="(item, index) in content.items"
            :key="index"
            :item="item"
            :index="index"
            :container="content.itemContainer"
            :selected-value="selectedValue"
            :readonly="content.readonly"
            @update:selectedValue="onChange"
        ></Item>
    </wwSimpleLayout> -->

    <wwLayout role="radiogroup" path="slot">
        <template #default="{ item, index }">
            <wwLayoutItem>
                <Item
                    :index="index"
                    :container="item"
                    :selected-value="selectedValue"
                    :readonly="content.readonly"
                    @update:selectedValue="onChange"
                />
            </wwLayoutItem>
        </template>
    </wwLayout>
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
