---
name: ww-radiogroup
description: Radio group component for single option selection from multiple choices. Requires ww-input-radio and ww-radiogroup-item components to function properly.
keywords: [radio, form, input, selection, group, choice, option]
---

#### ww-radiogroup

***Purpose:***
A container component that manages a group of radio buttons, allowing users to select exactly one option from multiple choices. Provides coordinated state management and interaction handling for child radio items.

***Features:***
- Dynamic item generation from data arrays
- Custom value determination via formulas
- Per-item readonly state control
- Automatic radio button grouping

***Properties:***
- value: string - Currently selected value
- name: string - Unique name for the radio group
- items: Array<Object> - Collection of items to display as radio options
- valueFormula: Formula - Expression to extract value from each item
- readonlyFormula: Formula - Expression to determine readonly state per item
- readonly: boolean - Makes entire group read-only (default: false)
- required: boolean - Whether selection is required (default: false)
- isSelectOnClick: boolean - Enable click-to-select behavior (default: true)
- fieldName: string - ***FORM ONLY*** Name for form submission when used inside a form
- customValidation: boolean - ***FORM ONLY*** Enable custom validation (default: false)
- validation: Formula - ***FORM ONLY*** Custom validation formula (returns true if valid)

***Slots:***
- itemElement: (element) - Template for each radio item (default: ww-div)

***Context data (only accessible to this element and its children):***
- context.local.data?.['radioItem']?.['isSelected'] - Whether the current item is selected
- context.local.data?.['radioItem']?.['disabled'] - Whether the current item is disabled
- context.local.data?.['radioItem']?.['data'] - Data object of the current item

***Exposed Variables:***
- value: Currently selected value (path: variables['current_element_uid-value'])

***Events:***
- change: Triggered when selection changes. Payload: { value: string }
- initValueChange: Triggered when initial value changes. Payload: { value: string }

***Notes:***
- Automatically coordinates radio button behavior within the group
- Uses provide/inject pattern to share state with child components
- Supports formulas for dynamic value and readonly state determination
- When used inside a form container, enables form submission and validation features

***Example:***
Example for a pricing select:
<elements>
{"uid":0,"tag":"ww-radiogroup","settings":{"dynamicConfiguration":{"content":{"items":[{"key":"title","type":"Text"},{"key":"id","type":"Text"},{"key":"price","type":"Number"},{"key":"priceTtc","type":"Number"},{"key":"description","type":"Text"},{"key":"disabled","type":"OnOff"}]}}},"props":{"default":{"items":[{"id":"prix-1","price":10,"title":"Basic","priceTtc":12,"description":"Essentatial features for individual"},{"id":"prix-2","price":20,"title":"Professional","priceTtc":25,"description":"Advanced features for professional"},{"id":"prix-3","price":50,"title":"Enterprise","disabled":true,"priceTtc":60,"description":"Complete solutions for teams"}],"value":"prix-1","readonly":false,"required":false,"valueFormula":{"code":"context.mapping?.['item']?.['id']","type":"f"},"isSelectOnClick":true,"readonlyFormula":{"code":"context.mapping?.['item']?.['disabled']","type":"f"}}},"styles":{"default":{"rowGap":"10px","flexDirection":"column"}},"children":{"itemElement":{"uid":1}}}
{"uid":1,"tag":"ww-div","styles":{"default":{"border":{"code":"context.local.data?.['radioItem']?.['isSelected'] ? '2px solid #2B7FFF' : '2px solid #e8eaed'","__wwtype":"f"},"padding":"10px","transition":"all 0.3s ease 0s","borderRadius":"10px","backgroundColor":{"code":"context.local.data?.['radioItem']?.['isSelected']  ? \"#DBEAFE\" : undefined","__wwtype":"f"},"columnGap":"0.5rem","alignItems":"flex-start"}},"children":{"children":[{"uid":2},{"uid":3}]}}
{"uid":2,"tag":"ww-input-radio","props":{"default":{"readonly":false,"appearance":"simple"}},"styles":{"default":{"margin":"5px 5px","display":true,"outline":"none"}}}
{"uid":3,"tag":"ww-div","styles":{"default":{"flexDirection":"column"}},"children":{"children":[{"uid":4},{"uid":5},{"uid":6},{"uid":7}]}}
{"uid":4,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"context.local.data?.['radioItem']?.['data']?.['title']","__wwtype":"f","defaultValue":"<div>This is some text</div>"}}}},"styles":{"default":{"fontSize":"16px"}}}
{"uid":5,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"\"HT: \" +  context.local.data?.['radioItem']?.['data']?.['price']  + \"€\"","__wwtype":"f","defaultValue":"<p>This is some text</p>"}}}},"styles":{"default":{"color":"#2B7FFF","fontSize":"18px","fontWeight":600}}}
{"uid":6,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"\"TTC: \" +  context.local.data?.['radioItem']?.['data']?.['priceTtc']  + \"€\"","__wwtype":"f","defaultValue":"<p>This is some text</p>"}}}},"styles":{"default":{"fontSize":"18px","fontWeight":600}}}
{"uid":7,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"context.local.data?.['radioItem']?.['data']?.['description']","__wwtype":"f","defaultValue":"<p>This is some text</p>"}}}},"styles":{"default":{"color":"#A3A3A3","fontSize":"14px"}}}
</elements>
