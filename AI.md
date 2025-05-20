---
name: ww-radiogroup
description: Radio group component for single option selection from multiple choices
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
- valueFormula: Formula - ***REQUIRED*** Expression to extract value from each item
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
{"uid":0,"tag":"ww-radiogroup","name":"Pricing Radio Group","settings":{},"events":[{"trigger":"change","name":"Update Selected Plan","description":"Updates the selected plan when a radio option is changed","js":"variables['6d3befa1-7416-40a7-97f2-647650e22bdd'] = event.value;"}],"props":{"default":{"items":{"js":"return variables['d870e2e5-b689-463c-b2d7-8acc81e7d2db']"},"value":{"js":"return variables['6d3befa1-7416-40a7-97f2-647650e22bdd']"},"readonly":false,"required":true,"fieldName":"","validation":"","valueFormula":{"js":"return context.mapping?.['item']?.['id']"},"isSelectOnClick":true,"readonlyFormula":{"js":"return return false"},"customValidation":false}},"styles":{"tablet":{"width":"100%","display":"flex","maxWidth":"400px","alignItems":"center","flexDirection":"column"},"default":{"width":"100%","display":"flex","rowGap":"24px","columnGap":"24px","flexDirection":"row","justifyContent":"center"}},"slots":{"itemElement":{"uid":1}}}
{"uid":1,"tag":"ww-div","name":"Plan Card","states":[{"id":"_wwHover","label":"hover"}],"styles":{"tablet":{"display":"flex"},"default":{"width":"100%","border":{"js":"return context.local.data?.['radioItem']?.['isSelected'] ? '2px solid #3b82f6' : '2px solid transparent'"},"display":"flex","padding":"32px 24px","maxWidth":"350px","position":"relative","boxShadow":{"js":"return context.local.data?.['radioItem']?.['isSelected'] ? '0px 12px 30px rgba(59, 130, 246, 0.15)' : '0px 4px 20px rgba(0, 0, 0, 0.06)'"},"transform":{"js":"return context.local.data?.['radioItem']?.['isSelected'] ? 'translateY(-8px)' : 'translateY(0)'"},"transition":"all 0.3s ease","borderRadius":"16px","backgroundColor":"#ffffff","cursor":"pointer","flexDirection":"column"},"_wwHover_default":{"display":"flex","boxShadow":"0px 8px 30px rgba(0, 0, 0, 0.12)","transform":"translateY(-4px)"}},"slots":{"children":[{"uid":2},{"uid":4},{"uid":6},{"uid":9},{"uid":13},{"uid":14}]}}
{"uid":2,"tag":"ww-div","name":"Recommended Badge","states":[{"id":"_wwHover","label":"hover"}],"styles":{"tablet":{"display":{"js":"return context.local.data?.['radioItem']?.['data']?.['recommended'] ? 'flex' : 'none'"}},"default":{"top":"-12px","left":"50%","display":{"js":"return context.local.data?.['radioItem']?.['data']?.['recommended'] ? 'flex' : 'none'"},"padding":"6px 16px","position":"absolute","boxShadow":"0px 2px 8px rgba(59, 130, 246, 0.3)","transform":"translateX(-50%)","borderRadius":"100px","backgroundColor":"#3b82f6","alignItems":"center","justifyContent":"center"},"_wwHover_default":{"display":{"js":"return context.local.data?.['radioItem']?.['data']?.['recommended'] ? 'flex' : 'none'"}}},"slots":{"children":[{"uid":3}]}}
{"uid":3,"tag":"ww-text","name":"Recommended Text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"p","text":{"en":"Recommended"}}},"styles":{"default":{"color":"#ffffff","fontSize":"12px","fontWeight":"600","letterSpacing":"0.5px"}}}
{"uid":4,"tag":"ww-div","name":"Plan Header","states":[{"id":"_wwHover","label":"hover"}],"styles":{"tablet":{"display":"flex"},"default":{"width":"100%","margin":"0 0 24px 0","display":"flex","alignItems":"center","flexDirection":"column"},"_wwHover_default":{"display":"flex"}},"slots":{"children":[{"uid":5}]}}
{"uid":5,"tag":"ww-text","name":"Plan Name","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"h3","text":{"en":{"js":"return context.local.data?.['radioItem']?.['data']?.['name']"}}}},"styles":{"default":{"margin":"0 0 8px 0","color":"#0f172a","fontSize":"24px","textAlign":"center","fontWeight":"700"}}}
{"uid":6,"tag":"ww-div","name":"Plan Price Container","states":[{"id":"_wwHover","label":"hover"}],"styles":{"tablet":{"display":"flex"},"default":{"width":"100%","margin":"0 0 24px 0","display":"flex","alignItems":"center","flexDirection":"column"},"_wwHover_default":{"display":"flex"}},"slots":{"children":[{"uid":7},{"uid":8}]}}
{"uid":7,"tag":"ww-text","name":"Plan Price","states":[{"id":"price_change","label":"Price Change","condition":{"js":"return true"}}],"settings":{},"events":[{"trigger":"initValueChange","name":"Animate Price Change","description":"Animates the price when it changes","js":"// Add animation class\nconst element = document.getElementById(context.element.id);\nif (element) {\n  element.style.animation = 'none';\n  setTimeout(() => {\n    element.style.animation = 'priceChange 0.5s ease';\n  }, 10);\n}"}],"props":{"default":{"tag":"h2","text":{"en":{"js":"return variables['b9a26eaa-5683-47bc-9b06-d035a8dd826a'] ? context.local.data?.['radioItem']?.['data']?.['annualPrice'] : context.local.data?.['radioItem']?.['data']?.['price']"}}}},"styles":{"mobile":{"fontSize":"32px"},"default":{"margin":"0 0 4px 0","color":"#0f172a","fontSize":"36px","textAlign":"center","fontWeight":"800"}}}
{"uid":8,"tag":"ww-text","name":"Plan Period","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"p","text":{"en":{"js":"return 'per ' + context.local.data?.['radioItem']?.['data']?.['period']"}}}},"styles":{"default":{"color":"#64748b","fontSize":"14px","textAlign":"center","fontWeight":"400"}}}
{"uid":9,"tag":"ww-div","name":"Plan Features Container","states":[{"id":"_wwHover","label":"hover"}],"styles":{"tablet":{"display":"flex"},"default":{"width":"100%","margin":"0 0 24px 0","display":"flex","rowGap":"12px","columnGap":"12px","alignItems":"flex-start","flexDirection":"column"},"_wwHover_default":{"display":"flex"}},"slots":{"children":[{"uid":10}]},"repeatSlots":[{"slot":"children","value":{"js":"return context.local.data?.['radioItem']?.['data']?.['features'] || []"}}]}
{"uid":10,"tag":"ww-div","name":"Feature Item","states":[{"id":"_wwHover","label":"hover"}],"styles":{"tablet":{"display":"flex"},"default":{"width":"100%","display":"flex","alignItems":"center","flexDirection":"row"},"_wwHover_default":{"display":"flex"}},"slots":{"children":[{"uid":11},{"uid":12}]}}
{"uid":11,"tag":"ww-icon","name":"Feature Icon","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"phosphor-regular/check-circle","color":"#3b82f6"}},"styles":{"default":{"width":"20px","height":"20px","margin":"0 12px 0 0"}}}
{"uid":12,"tag":"ww-text","name":"Feature Text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"p","text":{"en":{"js":"return context.item.data"}}}},"styles":{"default":{"color":"#334155","fontSize":"14px","fontWeight":"400"}}}
{"uid":13,"tag":"ww-text","name":"Plan Description","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"p","text":{"en":{"js":"return context.local.data?.['radioItem']?.['data']?.['description']"}}}},"styles":{"default":{"margin":"0 0 24px 0","color":"#64748b","fontSize":"14px","textAlign":"center","fontWeight":"400"}}}
{"uid":14,"tag":"ww-input-radio","name":"Plan Radio","states":[{"id":"_wwParent_6e40bbd1-fbda-4c97-b446-5e5ef0d67be3__wwHover","label":"Plan Card:hover"}],"props":{"default":{"readonly":false,"appearance":"simple"}},"styles":{"default":{"width":"24px","border":"2px solid #cbd5e1","cursor":"pointer","height":"24px","margin":"0 auto","position":"relative","borderRadius":"50%","backgroundColor":"#ffffff","opacity":0,"alignItems":"center","justifyContent":"center"},"_wwParent_6e40bbd1-fbda-4c97-b446-5e5ef0d67be3__wwHover_default":{"borderColor":"#3b82f6"}}}
</elements>
