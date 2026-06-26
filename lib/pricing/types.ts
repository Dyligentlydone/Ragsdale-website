export type UnitType =
  | "square_foot"
  | "linear_foot"
  | "sheet"
  | "each"
  | "roll"

export interface Material {
  id: string
  name: string
  unit: UnitType
  costPerUnit: number
  notes?: string
  active: boolean
}

export interface LaborRate {
  id: string
  name: string
  hourlyRate: number
  notes?: string
}

export interface MachineRate {
  id: string
  name: string
  hourlyCost: number
  notes?: string
}

export interface PricingSettings {
  setupFee: number
  rushFee: number
  minimumCharge: number
  markupPercent: number
  wastePercent: number
  taxPercent: number
  deliveryFee: number
}

export type FieldType =
  | "number"
  | "text"
  | "dropdown"
  | "checkbox"
  | "toggle"
  | "dimensions"
  | "quantity"

export interface ProductFieldBase {
  id: string
  name: string
  label: string
  type: FieldType
  required?: boolean
  helpText?: string
  defaultValue?: string | number | boolean | null
  pricing?: FieldPricingRule
}

export interface FieldPricingRule {
  amount: number
  description?: string
}

export interface DropdownOption {
  label: string
  value: string
  materialId?: string
}

export interface DropdownField extends ProductFieldBase {
  type: "dropdown"
  options?: DropdownOption[]
  optionsSource?: {
    type: "materials"
    filterUnit?: UnitType
  }
}

export interface NumberField extends ProductFieldBase {
  type: "number" | "quantity"
  unit?: string
  min?: number
  max?: number
  step?: number
}

export interface TextField extends ProductFieldBase {
  type: "text"
  placeholder?: string
}

export interface CheckboxField extends ProductFieldBase {
  type: "checkbox" | "toggle"
}

export interface DimensionField extends ProductFieldBase {
  type: "dimensions"
  unit?: "inch" | "foot"
}

export type ProductField =
  | DropdownField
  | NumberField
  | TextField
  | CheckboxField
  | DimensionField

export interface QuantitySourceField {
  type: "field"
  fieldName: string
  multiplier?: number
}

export interface QuantitySourceDimensions {
  type: "dimensions"
  fieldName: string
  multiplier?: number
  convertTo?: "square_foot"
}

export interface QuantitySourceFixed {
  type: "fixed"
  value: number
}

export type QuantitySource =
  | QuantitySourceField
  | QuantitySourceDimensions
  | QuantitySourceFixed

export interface MaterialRule {
  id: string
  materialId?: string
  materialField?: string
  quantity: QuantitySource
}

export interface LaborRule {
  id: string
  laborId: string
  baseHours?: number
  hoursPerUnit?: number
  quantityField?: string
}

export interface MachineRule {
  id: string
  machineId: string
  baseHours?: number
  hoursPerUnit?: number
  quantityField?: string
}

export interface FeeRules {
  includeSetupFee?: boolean
  includeDeliveryFee?: boolean
  includeRushField?: string // field name that toggles rush
  taxable?: boolean
}

export interface ProductTemplate {
  id: string
  name: string
  description?: string
  active: boolean
  fields: ProductField[]
  pricingRules: {
    materials?: MaterialRule[]
    labor?: LaborRule[]
    machines?: MachineRule[]
    fees?: FeeRules
  }
}

export type EstimateStatus = "draft" | "sent" | "approved" | "rejected" | "completed"

export interface EstimateInputValues {
  [key: string]: any
}

export interface EstimateRecord {
  id: string
  estimateNumber: string
  customerName: string
  company?: string
  productId: string
  productName: string
  inputValues: EstimateInputValues
  pricingBreakdown: PricingBreakdown
  finalPrice: number
  notes?: string
  status: EstimateStatus
  createdAt: string
  updatedAt: string
}

export interface PricingBreakdown {
  materialCost: number
  laborCost: number
  machineCost: number
  setupFee: number
  rushFee: number
  deliveryFee: number
  waste: number
  subtotal: number
  markup: number
  tax: number
  total: number
  lineItems: Array<{
    label: string
    amount: number
  }>
}

export interface PricingDataStore {
  materials: Material[]
  labor: LaborRate[]
  machines: MachineRate[]
  settings: PricingSettings
  products: ProductTemplate[]
  estimates: EstimateRecord[]
}
