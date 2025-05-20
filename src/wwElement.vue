<template>
    <wwSimpleLayout role="radiogroup">
        <template v-for="(data, index) in content.items" :key="index">
            <wwLayoutItemContext is-repeat :index="index" :data="data">
                <Item
                    :data="data"
                    :index="index"
                    :element="content.itemElement"
                    :selectedValue="selectedValue"
                    :isSelectOnClick="content.isSelectOnClick"
                    :isReadonly="content.readonly"
                    :valueFormula="content.valueFormula"
                    :readonlyFormula="content.readonlyFormula"
                    :isEditing="isEditing"
                    @update:selectedValue="setSelectedValue"
                />
            </wwLayoutItemContext>
        </template>
    </wwSimpleLayout>
</template>

<script>
import { provide, computed, inject } from 'vue';
import Item from './Item.vue';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
    },
    components: {
        Item,
    },
    emits: ['add-state', 'remove-state', 'update:sidepanel-content'],
    setup(props, { emit }) {
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

        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        // Form integration
        const useForm = inject('_wwForm:useForm', () => ({}));

        // Form field configuration
        const fieldName = computed(() => props.content?.fieldName);
        const validation = computed(() => props.content?.validation);
        const customValidation = computed(() => props.content?.customValidation);
        const required = computed(() => props.content?.required);

        // Use form integration
        useForm(
            selectedValue,
            { fieldName, validation, customValidation, required, initialValue: computed(() => props.content.value) },
            { elementState: props.wwElementState, emit, sidepanelFormPath: 'form', setValue: setSelectedValue }
        );

        return { selectedValue, setSelectedValue, isEditing };
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
