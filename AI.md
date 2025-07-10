---
name: ww-radiogroup
description: Container component that manages radio button groups. Works with ww-radiogroup-item and ww-input-radio.
keywords: [radio, form, input, selection, group, choice, option, container]
---

#### ww-radiogroup

***Purpose:***
A container component that manages a group of radio buttons, allowing users to select exactly one option from multiple choices. Provides coordinated state management and interaction handling for child radio items.

***Features:***
- Dynamic item generation from data arrays
- Custom value determination via formulas
- Per-item readonly state control
- Automatic radio button grouping and state management
- Form integration with validation support

***Properties:***
- value: string - Currently selected value
- name: string - Unique name for the radio group
- items: Array<Object> - Collection of items to display as radio options
- valueFormula: Formula - Expression to extract value from each item
- readonlyFormula: Formula - Expression to determine readonly state per item
- readonly: boolean - Makes entire group read-only (default: false)
- required: boolean - Whether selection is required (default: false)
- isSelectOnClick: boolean - Enable click-to-select behavior (default: true)
- fieldName: string - Name for form submission when used inside a form
- customValidation: boolean - Enable custom validation (default: false)
- validation: Formula - Custom validation formula (returns true if valid)

***Slots:***
- itemElement: (element) ww-flexbox - Template for each radio item (default: ww-flexbox)

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
- Uses provide/inject pattern to share state with child components (ww-radiogroup-item and ww-input-radio)
- Supports formulas for dynamic value and readonly state determination
- When used inside a form container, enables form submission and validation features
- Each radiogroup maintains its own selection state, even if multiple groups share the same name

***Example:***
Example for a pricing selector using the three-component architecture:
<elements>
{"uid":0,"tag":"ww-radiogroup","settings":{"dynamicConfiguration":{"content":{"items":[{"key":"title","type":"Text"},{"key":"id","type":"Text"},{"key":"price","type":"Number"},{"key":"priceTtc","type":"Number"},{"key":"description","type":"Text"},{"key":"disabled","type":"OnOff"}]}}},"props":{"default":{"items":[{"id":"prix-1","price":10,"title":"Basic","priceTtc":12,"description":"Essential features for individual"},{"id":"prix-2","price":20,"title":"Professional","priceTtc":25,"description":"Advanced features for professional"},{"id":"prix-3","price":50,"title":"Enterprise","disabled":true,"priceTtc":60,"description":"Complete solutions for teams"}],"value":"prix-1","readonly":false,"required":false,"valueFormula":{"code":"context.mapping?.['item']?.['id']","type":"f"},"isSelectOnClick":true,"readonlyFormula":{"code":"context.mapping?.['item']?.['disabled']","type":"f"}}},"styles":{"default":{"rowGap":"10px","flexDirection":"column"}},"children":{"itemElement":{"uid":1}}}
{"uid":1,"tag":"ww-radiogroup-item","props":{"default":{"value":{"code":"context.mapping?.['item']?.['id']","type":"f"},"selectOnClick":true,"disabled":{"code":"context.mapping?.['item']?.['disabled']","type":"f"}}},"children":{"children":[{"uid":2}]}}
{"uid":2,"tag":"ww-div","styles":{"default":{"border":{"code":"context.local.data?.['radioItem']?.['isSelected'] ? '2px solid #2B7FFF' : '2px solid #e8eaed'","__wwtype":"f"},"padding":"10px","transition":"all 0.3s ease 0s","borderRadius":"10px","backgroundColor":{"code":"context.local.data?.['radioItem']?.['isSelected']  ? \"#DBEAFE\" : undefined","__wwtype":"f"},"columnGap":"0.5rem","alignItems":"flex-start","flexDirection":"row"}},"children":{"children":[{"uid":3},{"uid":4}]}}
{"uid":3,"tag":"ww-input-radio","props":{"default":{"readonly":false}},"styles":{"default":{"margin":"5px 5px","display":true,"outline":"none"}}}
{"uid":4,"tag":"ww-div","styles":{"default":{"flexDirection":"column","flex":"1"}},"children":{"children":[{"uid":5},{"uid":6},{"uid":7},{"uid":8}]}}
{"uid":5,"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":{"code":"context.mapping?.['item']?.['title']","__wwtype":"f"}}}},"styles":{"default":{"fontSize":"16px","fontWeight":600}}}
{"uid":6,"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":{"code":"\"HT: \" +  context.mapping?.['item']?.['price']  + \"€\"","__wwtype":"f"}}}},"styles":{"default":{"color":"#2B7FFF","fontSize":"18px","fontWeight":600}}}
{"uid":7,"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":{"code":"\"TTC: \" +  context.mapping?.['item']?.['priceTtc']  + \"€\"","__wwtype":"f"}}}},"styles":{"default":{"fontSize":"18px","fontWeight":600}}}
{"uid":8,"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":{"code":"context.mapping?.['item']?.['description']","__wwtype":"f"}}}},"styles":{"default":{"color":"#A3A3A3","fontSize":"14px"}}}
</elements>
