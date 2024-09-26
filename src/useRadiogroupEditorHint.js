import { reactive, computed, watch } from 'vue';

export default function useRadiogroupEditorHint(emit) {
    const radioItems = reactive({});

    function registerItem(id, value) {
        radioItems[id] = value;
    }

    function unregisterItem(id) {
        delete radioItems[id];
    }

    function isValueAlreadyExist(id, value) {
        const items = { ...radioItems };
        delete items[id];
        return Object.values(items).includes(value);
    }

    const isDuplicateValues = computed(
        () => new Set(Object.values(radioItems)).size !== Object.values(radioItems).length
    );

    watch(
        radioItems,
        () => {
            emit('update:sidepanel-content', {
                path: 'isDuplicateItemValues',
                value: isDuplicateValues.value,
            });
        },
        { deep: true, immediate: true }
    );

    return { radioItems, registerItem, unregisterItem, isValueAlreadyExist };
}
