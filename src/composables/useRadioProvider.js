import { onUnmounted, provide, ref, unref, watch, computed } from "vue";

export function useRadioProvider(props, emit, setValue) {
  const registeredRadios = ref(new Map());
  const selectedValue = ref(props.content.value);

  function registerRadio(uid, valueRef) {
    if (!uid) return;

    // Store the value ref (computed or regular value)
    registeredRadios.value.set(uid, valueRef);
    
    // Force reactivity update
    registeredRadios.value = new Map(registeredRadios.value);
  }

  function unregisterRadio(uid) {
    if (!uid) return;

    registeredRadios.value.delete(uid);
    registeredRadios.value = new Map(registeredRadios.value);
  }

  function setSelectedValue(value) {
    if (selectedValue.value === value) return;
    selectedValue.value = value;
    // Use WeWeb's setValue to update the component variable
    if (setValue) {
      setValue(value);
    }
    emit('trigger-event', { name: 'change', event: { value } });
  }

  // Check if a radio is selected
  function isRadioSelected(value) {
    return unref(selectedValue) === unref(value);
  }

  // Provide the radio group context
  function useRadioChild(uid, valueRef) {
    if (!uid) return {};

    // Register on mount
    registerRadio(uid, valueRef);

    // Watch for value changes
    /* wwEditor:start */
    const stopWatcher = watch(
      () => unref(valueRef),
      () => {
        // Force update when value changes
        registeredRadios.value = new Map(registeredRadios.value);
      }
    );
    /* wwEditor:end */

    // Cleanup on unmount
    onUnmounted(() => {
      unregisterRadio(uid);
      /* wwEditor:start */
      if (stopWatcher) stopWatcher();
      /* wwEditor:end */
    });

    // Return radio context
    return {
      name: computed(() => props.content.name || 'radio-group'),
      selectedValue: computed(() => selectedValue.value),
      isSelected: computed(() => isRadioSelected(valueRef)),
      isReadonly: computed(() => props.content.readonly),
      isRequired: computed(() => props.content.required),
      select: () => setSelectedValue(unref(valueRef)),
    };
  }

  provide("_wwRadioGroup:useRadioChild", useRadioChild);

  // Computed properties for state
  const radioValues = computed(() => {
    const values = [];
    for (const [uid, valueRef] of registeredRadios.value.entries()) {
      const value = unref(valueRef);
      if (value !== undefined && value !== null) {
        values.push(value);
      }
    }
    return values;
  });

  const hasDuplicateValues = computed(() => {
    const values = radioValues.value;
    const uniqueValues = new Set(values);
    return values.length > uniqueValues.length;
  });

  const duplicateValues = computed(() => {
    const values = radioValues.value;
    const seen = new Set();
    const duplicates = new Set();
    
    for (const value of values) {
      if (seen.has(value)) {
        duplicates.add(value);
      }
      seen.add(value);
    }
    
    return Array.from(duplicates);
  });

  return {
    registeredRadios,
    selectedValue,
    radioValues,
    hasDuplicateValues,
    duplicateValues,
  };
}