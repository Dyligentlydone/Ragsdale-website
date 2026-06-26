import {
  DropdownField,
  EstimateInputValues,
  PricingBreakdown,
  PricingDataStore,
  ProductField,
  ProductTemplate,
  QuantitySource,
} from "./types"

const resolveMaterialIdFromValue = (value: unknown): string | undefined => {
  if (!value) return undefined
  if (typeof value === "object") {
    return (value as any).materialId ?? (value as any).value ?? undefined
  }
  return value as string
}

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return value
  if (typeof value === "boolean") return value ? 1 : 0
  if (typeof value === "string") return Number(value) || 0
  return 0
}

const resolveQuantityFromValue = (value: unknown): number => {
  if (value && typeof value === "object" && "width" in value && "height" in value) {
    const width = toNumber((value as any).width)
    const height = toNumber((value as any).height)
    const unit = (value as any).unit === "foot" ? "foot" : "inch"
    const area = width * height
    return unit === "inch" ? area / 144 : area
  }
  return toNumber(value)
}

const resolveQuantity = (source: QuantitySource, inputs: EstimateInputValues): number => {
  if (source.type === "field") {
    return resolveQuantityFromValue(inputs[source.fieldName]) * (source.multiplier ?? 1)
  }

  if (source.type === "dimensions") {
    const value = inputs[source.fieldName]
    const width = toNumber(value?.width)
    const height = toNumber(value?.height)
    const area = width * height
    const convertTo = source.convertTo ?? "square_foot"
    const convertedArea = convertTo === "square_foot" ? area / 144 : area
    return convertedArea * (source.multiplier ?? 1)
  }

  if (source.type === "fixed") {
    return source.value
  }

  if (source.type === "sheet") {
    const pieces = resolveQuantityFromValue(inputs[source.fieldName])
    const perSheet = source.piecesPerSheet > 0 ? source.piecesPerSheet : 1
    return Math.ceil(pieces / perSheet)
  }

  return 0
}

interface CalculateParams {
  template: ProductTemplate
  inputs: EstimateInputValues
  store: PricingDataStore
}

export const calculatePricing = ({ template, inputs, store }: CalculateParams): PricingBreakdown => {
  // Field-driven material pricing: each dropdown linked to a material can
  // declare how its cost is computed (per piece, per sheet, or per area).
  const fieldsWithPricing = template.fields.filter(
    (field): field is DropdownField => field.type === "dropdown" && Boolean((field as DropdownField).materialPricing),
  )

  const fieldMaterialCost = fieldsWithPricing.reduce((sum, field) => {
    const pricing = field.materialPricing!
    const materialId = resolveMaterialIdFromValue(inputs[field.name])
    const material = store.materials.find((m) => m.id === materialId)
    if (!material || !material.active) return sum

    let units = 0
    if (pricing.mode === "per_piece") {
      const qty = pricing.quantityField ? resolveQuantityFromValue(inputs[pricing.quantityField]) : 0
      units = qty
    } else if (pricing.mode === "per_sheet") {
      const qty = pricing.quantityField ? resolveQuantityFromValue(inputs[pricing.quantityField]) : 0
      const perSheet = (pricing.piecesPerSheet ?? 1) > 0 ? pricing.piecesPerSheet ?? 1 : 1
      units = Math.ceil(qty / perSheet)
    } else if (pricing.mode === "per_area") {
      units = pricing.dimensionField ? resolveQuantityFromValue(inputs[pricing.dimensionField]) : 0
    }
    return sum + units * material.costPerUnit
  }, 0)

  // Legacy rule-based material pricing. Skip any rule whose field already has
  // field-driven pricing to avoid double counting.
  const fieldNamesWithPricing = new Set(fieldsWithPricing.map((field) => field.name))
  const legacyMaterialCost = (template.pricingRules.materials ?? []).reduce((sum, rule) => {
    if (rule.materialField && fieldNamesWithPricing.has(rule.materialField)) return sum
    const fieldValue = rule.materialField ? inputs[rule.materialField] : undefined
    const targetMaterialId = rule.materialId ?? resolveMaterialIdFromValue(fieldValue)
    const material = store.materials.find((m) => m.id === targetMaterialId)
    if (!material || !material.active) return sum
    const quantity = resolveQuantity(rule.quantity, inputs)
    return sum + quantity * material.costPerUnit
  }, 0)

  const materialCost = fieldMaterialCost + legacyMaterialCost

  const laborCost = (template.pricingRules.labor ?? []).reduce((sum, rule) => {
    const labor = store.labor.find((l) => l.id === rule.laborId)
    if (!labor) return sum
    const quantity = rule.quantityField ? resolveQuantityFromValue(inputs[rule.quantityField]) : 1
    const hours = (rule.baseHours ?? 0) + (rule.hoursPerUnit ?? 0) * quantity
    return sum + hours * labor.hourlyRate
  }, 0)

  const machineCost = (template.pricingRules.machines ?? []).reduce((sum, rule) => {
    const machine = store.machines.find((m) => m.id === rule.machineId)
    if (!machine) return sum
    const quantity = rule.quantityField ? resolveQuantityFromValue(inputs[rule.quantityField]) : 1
    const hours = (rule.baseHours ?? 0) + (rule.hoursPerUnit ?? 0) * quantity
    return sum + hours * machine.hourlyCost
  }, 0)

  const fieldAdjustmentItems = template.fields.reduce<{ label: string; amount: number }[]>((items, field) => {
    if (!field.pricing) return items
    const value = inputs[field.name]
    const isToggle = field.type === "checkbox" || field.type === "toggle"
    const enabled = isToggle
      ? value && typeof value === "object"
        ? Boolean((value as any).enabled)
        : Boolean(value)
      : true
    if (!enabled) return items
    const amount = (() => {
      if (isToggle && value && typeof value === "object" && "override" in value) {
        const override = (value as any).override
        if (typeof override === "number" && !Number.isNaN(override)) {
          return override
        }
      }
      return field.pricing!.amount
    })()
    return [...items, { label: field.pricing.description || field.label, amount }]
  }, [])
  const fieldAdjustments = fieldAdjustmentItems.reduce((sum, item) => sum + item.amount, 0)

  const fees = template.pricingRules.fees ?? {}
  const setupFee = fees.includeSetupFee ? store.settings.setupFee : 0
  const deliveryFee = fees.includeDeliveryFee ? store.settings.deliveryFee : 0
  const rushFee = fees.includeRushField && inputs[fees.includeRushField] ? store.settings.rushFee : 0

  const waste = (materialCost + laborCost + machineCost) * (store.settings.wastePercent / 100)

  let subtotal = materialCost + laborCost + machineCost + setupFee + deliveryFee + rushFee + waste + fieldAdjustments
  if (subtotal < store.settings.minimumCharge) {
    subtotal = store.settings.minimumCharge
  }

  const markup = subtotal * (store.settings.markupPercent / 100)
  const taxableBase = fees.taxable === false ? subtotal : subtotal + markup
  const tax = taxableBase * (store.settings.taxPercent / 100)
  const total = subtotal + markup + tax

  return {
    materialCost,
    laborCost,
    machineCost,
    setupFee,
    rushFee,
    deliveryFee,
    waste,
    subtotal,
    markup,
    tax,
    total,
    lineItems: [
      { label: "Materials", amount: materialCost },
      { label: "Labor", amount: laborCost },
      { label: "Machines", amount: machineCost },
      { label: "Setup Fee", amount: setupFee },
      { label: "Delivery", amount: deliveryFee },
      { label: "Rush", amount: rushFee },
      { label: "Waste", amount: waste },
      ...fieldAdjustmentItems,
      { label: "Markup", amount: markup },
      { label: "Tax", amount: tax },
    ],
  }
}
