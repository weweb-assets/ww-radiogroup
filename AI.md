---
name: ww-radiogroup
description: A customizable radio group component for creating radio button selections. It depends on the ww-input-radio component.
keywords: [radio, form, input, selection, group]
---

#### ww-radiogroup

A radio group component that allows users to select a single option from a list of choices. It provides customizable radio buttons with support for dynamic data binding and various interaction states.

Properties:
- value: string - Initial value of the radio group
- name: string - Unique identifier for the radio group
- items: Array<Object> - Collection of radio items to display
- valueFormula: Formula - Expression to determine the value for each radio item
- readonlyFormula: Formula - Expression to determine readonly state per item
- readonly: boolean (default: false) - Whether the entire radio group is read-only
- required: boolean (default: false) - Whether selection is required
- isSelectOnClick: boolean (default: true) - Whether items are selected on click

Children:
- itemElement: ww-div - Template for individual radio items

Context:
- context.mapping: Object - Mapping of the radio group used for value and readonly formulas
- context.local.data.radioItem.isSelected: boolean - Whether the radio item is selected
- context.local.data.radioItem.disabled: boolean - Whether the radio item is disabled (calculated from readonly formula)
- context.local.data.radioItem.data: Object - Data of the radio selected item

Events:
- change: Triggered when selection changes
  - payload: { value: string }
- initValueChange: Triggered when initial value changes
  - payload: { value: string }

Variables:
- value: any - Current selected value of the radio group

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
