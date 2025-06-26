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