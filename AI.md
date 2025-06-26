---
name: ww-radiogroup
description: Radio group container that manages radio inputs through self-registration. Works with ww-input-radio components.
keywords: [radio, form, input, selection, group, choice, option, container]
---

#### ww-radiogroup

***Purpose:***
A container component that manages a group of radio buttons through a self-registration pattern. Unlike traditional radio groups, it doesn't use an items array - instead, child `ww-input-radio` components register themselves with the group, allowing for flexible layouts and composition patterns.

***Recommended Pattern:***
```
ww-radiogroup
  └── ww-label (clickable wrapper/card)
       └── ww-input-radio (value="option1")
  └── ww-label (clickable wrapper/card)
       └── ww-input-radio (value="option2")
  └── ww-label (clickable wrapper/card)
       └── ww-input-radio (value="option3")
```

***Benefits of this pattern:***
- **Accessibility**: Labels make the entire area clickable
- **Flexibility**: Labels can be styled as cards, tiles, or buttons
- **No "for" attribute needed**: Radio is inside the label
- **Rich content**: Labels can contain descriptions, icons, prices, etc.

***Properties:***
- value: string/number - Currently selected value
- name: string - HTML name attribute for the radio group
- readonly: boolean - Makes all radios in the group readonly (default: false)
- required: boolean - Whether selection is required (default: false)
- fieldName: string - ***FORM ONLY*** Field name for form submission
- customValidation: boolean - ***FORM ONLY*** Enable custom validation (default: false)
- validation: Formula - ***FORM ONLY*** Custom validation formula

***Layout:***
- Uses wwLayout with path="children" to render child components
- Supports any layout mode (flex, grid, etc.)
- No restrictions on intermediate wrapper components

***State Management:***
- radiogroupState: Object - ***EDITOR ONLY*** Contains:
  - registeredRadios: Array of registered radio inputs
  - hasDuplicateValues: Boolean indicating duplicate values
  - duplicateValues: Array of duplicate values
  - form: Object with form info if inside a form

***Exposed Variables:***
- value: Currently selected value (path: variables['element_uid-value'])

***Events:***
- change: Triggered when selection changes. Payload: { value: string/number }
- initValueChange: Triggered when initial value changes. Payload: { value: string/number }

***Notes:***
- Radio inputs must have unique values within the group
- The radiogroup handles form registration (not individual radios)
- Supports any wrapper components between the group and radios
- Works seamlessly with ww-label for enhanced UX

<elements>
{"uid":0,"tag":"ww-radiogroup","name":"Radio Options","settings":{"dynamicConfiguration":{"content":{"children":[{"key":"label","type":"Text"},{"key":"value","type":"Text"}]}}},"props":{"default":{"name":"preference","value":"basic","readonly":false,"required":true,"fieldName":"preference","validation":"","customValidation":false}},"styles":{"default":{"width":"100%","display":"flex","rowGap":"16px","columnGap":"16px","flexDirection":"column"}},"slots":{"children":[{"uid":1}]},"repeatSlots":[{"slot":"children","value":{"js":"return [object Object],[object Object],[object Object]"}}]}
{"uid":1,"tag":"ww-label","name":"Option 1 Container","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"customHtmlFor":""}},"styles":{"default":{"width":"100%","border":"2px solid #e5e7eb","cursor":"pointer","display":"flex","padding":"20px","transition":"all 0.2s ease","borderRadius":"12px","backgroundColor":{"defaultValue":"#ffffff","js":"return context.local.data?.['radiogroup']?.['selectedValue']==context.item.data?.['value']  ? '#E0FFFF' : '#FFFFFF'"},"rowGap":"16px","columnGap":"16px","alignItems":"center","flexDirection":"row","flexGrow":"1"},"_wwHover_default":{"display":"flex","boxShadow":"0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06)","borderColor":"#4f46e5"}},"slots":{"children":[{"uid":2}]}}
{"uid":2,"tag":"ww-div","name":"Option 1 Content","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"flex":"1 1 0","display":"flex","customCss":{},"flexDirection":"column"},"_wwHover_default":{"display":"flex"}},"slots":{"children":[{"uid":3},{"uid":4}]}}
{"uid":3,"tag":"ww-input-radio","props":{"default":{"value":{"defaultValue":"basic","js":"return context.item.data?.['value']"},"readonly":false,"appearance":"simple"}},"styles":{"default":{"display":"none"}}}
{"uid":4,"tag":"ww-text","name":"Option 1 Title","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"h3","text":{"en":{"defaultValue":"Basic Plan","js":"return context.item.data?.['label']+ ' plan'"}}}},"styles":{"default":{"margin":"0 0 4px 0","color":"#111827","fontSize":"18px","fontWeight":"600"}}}
</elements>

