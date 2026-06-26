"use client"

import { useEffect, useMemo, useState, type ReactElement, type ReactNode } from "react"
import {
  ArrowRight,
  Calculator,
  Check,
  ClipboardList,
  Copy,
  Factory,
  FileBarChart,
  Layers,
  Plus,
  Search,
  Settings,
  Trash2,
  Warehouse,
} from "lucide-react"

import { PricingProvider, usePricingData } from "@/components/pricing/pricing-provider"
import { calculatePricing } from "@/lib/pricing/pricing-engine"
import {
  DropdownField,
  DropdownOption,
  EstimateRecord,
  LaborRate,
  MachineRate,
  Material,
  PricingBreakdown,
  ProductField,
  ProductTemplate,
  UnitType,
} from "@/lib/pricing/types"

const NAV_ITEMS = [
  { id: "overview", label: "Dashboard", icon: Calculator },
  { id: "new-estimate", label: "New Estimate", icon: ClipboardList },
  { id: "estimates", label: "Saved Estimates", icon: Layers },
  { id: "products", label: "Products", icon: Warehouse },
  { id: "materials", label: "Materials", icon: Factory },
  { id: "labor", label: "Labor", icon: Factory },
  { id: "machines", label: "Machines", icon: Factory },
  { id: "pricing", label: "Pricing Settings", icon: Settings },
  { id: "reports", label: "Reports", icon: FileBarChart },
 ] as const

type ViewKey = (typeof NAV_ITEMS)[number]["id"]

const SECTION_COMPONENTS: Record<ViewKey, () => ReactElement> = {
  overview: OverviewSection,
  "new-estimate": NewEstimateSection,
  estimates: EstimatesSection,
  products: ProductsSection,
  materials: MaterialsSection,
  labor: LaborSection,
  machines: MachinesSection,
  pricing: PricingSettingsSection,
  reports: ReportsSection,
}

const STATUS_OPTIONS = ["draft", "sent", "approved", "rejected", "completed"] as const

const UNIT_OPTIONS: { label: string; value: UnitType }[] = [
  { label: "Square Foot", value: "square_foot" },
  { label: "Linear Foot", value: "linear_foot" },
  { label: "Sheet", value: "sheet" },
  { label: "Each", value: "each" },
  { label: "Roll", value: "roll" },
]

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export default function PricingPage() {
  return (
    <PricingProvider>
      <PricingShell />
    </PricingProvider>
  )
}

function PricingShell() {
  const [view, setView] = useState<ViewKey>(NAV_ITEMS[0].id)
  const SectionComponent = SECTION_COMPONENTS[view] ?? OverviewSection

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex h-screen">
        <aside className="hidden lg:flex w-68 bg-black/40 border-r border-zinc-900 flex-col">
          <div className="px-6 py-6 border-b border-zinc-900">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Ragsdale</p>
            <h1 className="text-2xl font-semibold mt-1">Pricing Engine</h1>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = view === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setView(item.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        active
                          ? "bg-primary/15 text-white border border-primary/50 shadow-lg shadow-primary/10"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {active && <ArrowRight className="w-4 h-4 ml-auto text-primary" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="lg:hidden border-b border-zinc-900 bg-black/60 backdrop-blur-xl">
            <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                    view === item.id
                      ? "border-primary text-white bg-primary/20"
                      : "border-zinc-800 text-zinc-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-12 space-y-6">
            <SectionComponent />
          </main>
        </div>
      </div>
    </div>
  )
}

function OverviewSection() {
  const { data } = usePricingData()
  const stats = useMemo(() => {
    const totalVolume = data.estimates.reduce((sum, estimate) => sum + estimate.finalPrice, 0)
    const approvals = data.estimates.filter((e) => e.status === "approved" || e.status === "completed").length
    const winRate = data.estimates.length ? (approvals / data.estimates.length) * 100 : 0
    const recent = [...data.estimates].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5)

    return { totalVolume, winRate, recent }
  }, [data.estimates])

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Estimates" value={data.estimates.length} subtext="Since tracking" />
        <StatCard label="Avg. Win Rate" value={`${stats.winRate.toFixed(0)}%`} subtext="Approved + Completed" />
        <StatCard label="Materials" value={data.materials.length} subtext="Active presets" />
        <StatCard label="Volume" value={currency.format(stats.totalVolume)} subtext="Quoted" />
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-900 bg-black/40 p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Estimates</h3>
          <div className="space-y-4">
            {stats.recent.length === 0 && <p className="text-sm text-zinc-500">No estimates yet.</p>}
            {stats.recent.map((estimate) => (
              <div key={estimate.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{estimate.customerName || "Untitled Estimate"}</p>
                  <p className="text-sm text-zinc-500">{estimate.productName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{currency.format(estimate.finalPrice)}</p>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">{estimate.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-900 bg-black/40 p-6">
          <h3 className="text-lg font-semibold mb-4">Active Templates</h3>
          <div className="space-y-4">
            {data.products.map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-zinc-500">{product.fields.length} inputs · {product.pricingRules.materials?.length ?? 0} materials</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.active ? "bg-emerald-500/20 text-emerald-200" : "bg-zinc-800 text-zinc-400"}`}>
                  {product.active ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, subtext }: { label: string; value: string | number; subtext?: string }) {
  return (
    <div className="rounded-3xl border border-zinc-900 bg-gradient-to-br from-zinc-900/80 to-black/20 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{label}</p>
      <p className="text-3xl font-semibold mt-3">{value}</p>
      {subtext && <p className="text-sm text-zinc-500 mt-2">{subtext}</p>}
    </div>
  )
}

function MaterialsSection() {
  const { data, updateMaterials, upsertMaterial, deleteMaterial } = usePricingData()
  const [search, setSearch] = useState("")

  const handleChange = (id: string, field: keyof Material, value: any) => {
    updateMaterials(
      data.materials.map((material) => (material.id === id ? { ...material, [field]: value } : material)),
    )
  }

  const filteredMaterials = useMemo(() => {
    const term = search.toLowerCase()
    return data.materials
      .filter((material) => material.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [data.materials, search])

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Materials</h2>
          <p className="text-sm text-zinc-500">Manage substrates, boards, vinyl, and more.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-black/40 px-3 py-1.5 text-sm text-zinc-300">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials"
              className="bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={() => upsertMaterial({ name: "New Material" })}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="w-4 h-4" /> Add Material
          </button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-3xl border border-zinc-900 bg-black/30">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="p-4">Name</th>
              <th>Unit</th>
              <th>Cost / Unit</th>
              <th>Notes</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filteredMaterials.map((material) => (
              <tr key={material.id}>
                <td className="p-4">
                  <input
                    value={material.name}
                    onChange={(e) => handleChange(material.id, "name", e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
                  />
                </td>
                <td>
                  <select
                    value={material.unit}
                    onChange={(e) => handleChange(material.id, "unit", e.target.value as UnitType)}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
                  >
                    {UNIT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={material.costPerUnit}
                    onChange={(e) => handleChange(material.id, "costPerUnit", Number(e.target.value))}
                    className="w-32 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
                  />
                </td>
                <td>
                  <input
                    value={material.notes ?? ""}
                    onChange={(e) => handleChange(material.id, "notes", e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
                  />
                </td>
                <td>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={material.active}
                      onChange={(e) => handleChange(material.id, "active", e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-700"
                    />
                    {material.active ? "Active" : "Inactive"}
                  </label>
                </td>
                <td className="text-right pr-4">
                  <button
                    onClick={() => deleteMaterial(material.id)}
                    className="rounded-full border border-zinc-800 p-2 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function LaborSection() {
  const { data, updateLabor, upsertLabor, deleteLabor } = usePricingData()

  const handleChange = (id: string, field: keyof LaborRate, value: any) => {
    updateLabor(data.labor.map((rate) => (rate.id === id ? { ...rate, [field]: value } : rate)))
  }

  return (
    <ResourceSection
      title="Labor Rates"
      description="Hourly shop labor, design, installation, and finishing."
      items={data.labor}
      onAdd={() => upsertLabor({ name: "New Labor" })}
      onDelete={deleteLabor}
      renderRow={(item) => (
        <>
          <td className="p-4">
            <input
              value={item.name}
              onChange={(e) => handleChange(item.id, "name", e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
            />
          </td>
          <td>
            <input
              type="number"
              step="1"
              value={item.hourlyRate}
              onChange={(e) => handleChange(item.id, "hourlyRate", Number(e.target.value))}
              className="w-32 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
            />
          </td>
        </>
      )}
    />
  )
}

function MachinesSection() {
  const { data, updateMachines, upsertMachine, deleteMachine } = usePricingData()

  const handleChange = (id: string, field: keyof MachineRate, value: any) => {
    updateMachines(data.machines.map((machine) => (machine.id === id ? { ...machine, [field]: value } : machine)))
  }

  return (
    <ResourceSection
      title="Machine Rates"
      description="Billable machine hour costs and capital equipment."
      items={data.machines}
      onAdd={() => upsertMachine({ name: "New Machine" })}
      onDelete={deleteMachine}
      renderRow={(item) => (
        <>
          <td className="p-4">
            <input
              value={item.name}
              onChange={(e) => handleChange(item.id, "name", e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
            />
          </td>
          <td>
            <input
              type="number"
              value={item.hourlyCost}
              onChange={(e) => handleChange(item.id, "hourlyCost", Number(e.target.value))}
              className="w-32 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
            />
          </td>
          <td>
            <input
              value={item.notes ?? ""}
              onChange={(e) => handleChange(item.id, "notes", e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
            />
          </td>
        </>
      )}
    />
  )
}

function ResourceSection<T extends { id: string }>({
  title,
  description,
  items,
  onAdd,
  onDelete,
  renderRow,
}: {
  title: string
  description: string
  items: T[]
  onAdd: () => void
  onDelete: (id: string) => void
  renderRow: (item: T) => ReactNode
}) {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </header>

      <div className="overflow-x-auto rounded-3xl border border-zinc-900 bg-black/30">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-zinc-900">
            {items.map((item) => (
              <tr key={item.id}>
                {renderRow(item)}
                <td className="text-right pr-4">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="rounded-full border border-zinc-800 p-2 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function PricingSettingsSection() {
  const { data, updateSettings } = usePricingData()

  const handleChange = (field: keyof typeof data.settings, value: number) => {
    updateSettings({ [field]: value })
  }

  const fields: Array<{ key: keyof typeof data.settings; label: string; prefix?: string; suffix?: string }> = [
    { key: "setupFee", label: "Setup Fee", prefix: "$" },
    { key: "rushFee", label: "Rush Fee", prefix: "$" },
    { key: "minimumCharge", label: "Minimum Charge", prefix: "$" },
    { key: "deliveryFee", label: "Delivery Fee", prefix: "$" },
    { key: "markupPercent", label: "Markup", suffix: "%" },
    { key: "wastePercent", label: "Waste", suffix: "%" },
    { key: "taxPercent", label: "Tax", suffix: "%" },
  ]

  return (
    <section>
      <header className="mb-6">
        <h2 className="text-2xl font-semibold">Pricing Settings</h2>
        <p className="text-sm text-zinc-500">Global defaults applied across every estimate.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="text-sm text-zinc-400">{field.label}</span>
            <div className="flex items-center gap-2 rounded-2xl border border-zinc-900 bg-black/40 px-4 py-3">
              {field.prefix && <span className="text-zinc-500">{field.prefix}</span>}
              <input
                type="number"
                className="flex-1 bg-transparent text-lg font-semibold focus:outline-none"
                value={data.settings[field.key]}
                onChange={(e) => handleChange(field.key, Number(e.target.value))}
              />
              {field.suffix && <span className="text-zinc-500">{field.suffix}</span>}
            </div>
          </label>
        ))}
      </div>
    </section>
  )
}

function ProductsSection() {
  const { data, upsertProduct, deleteProduct } = usePricingData()
  const [selectedId, setSelectedId] = useState<string | null>(data.products[0]?.id ?? null)
  const [draft, setDraft] = useState<ProductTemplate | null>(null)
  const [newFieldName, setNewFieldName] = useState("")
  const [addingField, setAddingField] = useState(false)

  useEffect(() => {
    if (!selectedId && data.products[0]) {
      setSelectedId(data.products[0].id)
    }
  }, [data.products, selectedId])

  useEffect(() => {
    const template = data.products.find((product) => product.id === selectedId) ?? null
    setDraft(template ? structuredClone(template) : null)
  }, [selectedId, data.products])

  const handleFieldChange = (field: Partial<ProductTemplate>) => {
    if (!draft) return
    setDraft({ ...draft, ...field })
  }

  const updateField = (fieldId: string, updates: Partial<ProductField>) => {
    if (!draft) return
    setDraft({
      ...draft,
      fields: draft.fields.map((field) => (field.id === fieldId ? ({ ...field, ...updates } as ProductField) : field)),
    })
  }

  const toggleMaterialOption = (fieldId: string, materialId: string) => {
    if (!draft) return
    const material = data.materials.find((entry) => entry.id === materialId)
    if (!material) return
    const targetField = draft.fields.find((field) => field.id === fieldId)
    if (!targetField || targetField.type !== "dropdown") return

    const dropdownField = targetField as DropdownField
    const options = dropdownField.options ?? []
    const exists = options.some((option) => option.value === materialId)
    const nextOptions = exists
      ? options.filter((option) => option.value !== materialId)
      : [...options, { label: material.name, value: material.id, materialId: material.id }]

    const nextDefaultValue = (() => {
      if (exists && dropdownField.defaultValue === materialId) {
        return nextOptions[0]?.value ?? ""
      }
      if (!dropdownField.defaultValue && !exists) {
        return material.id
      }
      return dropdownField.defaultValue
    })()

    const nextFields = draft.fields.map((field) =>
      field.id === fieldId
        ? ({ ...field, options: nextOptions, defaultValue: nextDefaultValue } as ProductField)
        : field,
    )

    setDraft({ ...draft, fields: nextFields })
  }

  const removeField = (fieldId: string) => {
    if (!draft) return
    setDraft({ ...draft, fields: draft.fields.filter((field) => field.id !== fieldId) })
  }

  const addField = () => {
    if (!draft || !newFieldName.trim()) return
    const slug = newFieldName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
    const newField: ProductField = {
      id: crypto.randomUUID(),
      name: slug || `field_${draft.fields.length + 1}`,
      label: newFieldName.trim(),
      type: "dropdown",
      required: false,
      defaultValue: "",
      options: [],
    }
    setDraft({ ...draft, fields: [...draft.fields, newField] })
    setNewFieldName("")
    setAddingField(false)
  }

  const saveProduct = () => {
    if (!draft) return
    upsertProduct(draft)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[280px,1fr]">
      <div className="rounded-3xl border border-zinc-900 bg-black/40 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Templates</h3>
          <button
            onClick={() => {
              const tempId = crypto.randomUUID()
              upsertProduct({
                id: tempId,
                name: "New Product",
                description: "",
                active: true,
                fields: [],
                pricingRules: {},
              })
              setSelectedId(tempId)
            }}
            className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {data.products.map((product) => (
            <li key={product.id}>
              <button
                onClick={() => setSelectedId(product.id)}
                className={`w-full rounded-2xl border px-3 py-2 text-left text-sm ${
                  product.id === selectedId ? "border-primary/50 bg-primary/10" : "border-zinc-900"
                }`}
              >
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-zinc-500">{product.fields.length} fields</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-zinc-900 bg-black/30 p-6 min-h-[480px]">
        {!draft && <p className="text-sm text-zinc-500">Select a product to edit its template.</p>}
        {draft && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex-1 space-y-2">
                <input
                  value={draft.name}
                  onChange={(e) => handleFieldChange({ name: e.target.value })}
                  className="w-full rounded-2xl border border-zinc-900 bg-black/40 px-4 py-3 text-lg font-semibold"
                />
                <textarea
                  value={draft.description ?? ""}
                  onChange={(e) => handleFieldChange({ description: e.target.value })}
                  rows={2}
                  placeholder="Describe this template"
                  className="w-full rounded-2xl border border-zinc-900 bg-black/40 px-4 py-3 text-sm"
                />
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) => handleFieldChange({ active: e.target.checked })}
                  className="h-4 w-4 rounded border-zinc-700"
                />
                Active
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <h4 className="text-lg font-semibold">Input Fields</h4>
                {addingField ? (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      value={newFieldName}
                      onChange={(e) => setNewFieldName(e.target.value)}
                      placeholder="Field name"
                      className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-2 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addField}
                        disabled={!newFieldName.trim()}
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                      >
                        Save Field
                      </button>
                      <button
                        onClick={() => {
                          setAddingField(false)
                          setNewFieldName("")
                        }}
                        className="rounded-full border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAddingField(true)
                      setNewFieldName("")
                    }}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    + Add Field
                  </button>
                )}
              </div>
              {draft.fields.length === 0 && <p className="text-sm text-zinc-500">No fields yet.</p>}
              <div className="space-y-4">
                {draft.fields.map((field) => (
                  <div key={field.id} className="rounded-2xl border border-zinc-900 bg-black/50 p-4 space-y-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                      <input
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2"
                      />
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={field.required ?? false}
                            onChange={(e) => updateField(field.id, { required: e.target.checked })}
                          />
                          Required
                        </label>
                        <button onClick={() => removeField(field.id)} className="text-zinc-500 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <label className="space-y-1 text-xs">
                        <span className="text-zinc-500">Field Type</span>
                        <select
                          value={field.type}
                          onChange={(e) => updateField(field.id, { type: e.target.value as ProductField["type"] })}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm"
                        >
                          <option value="dropdown">Dropdown (materials)</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="toggle">Toggle</option>
                          <option value="number">Number</option>
                          <option value="quantity">Quantity</option>
                          <option value="text">Text</option>
                        </select>
                      </label>
                      <label className="space-y-1 text-xs">
                        <span className="text-zinc-500">Adjustment</span>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 text-sm">$</span>
                          <input
                            type="number"
                            value={field.pricing?.amount ?? 0}
                            onChange={(e) =>
                              updateField(field.id, {
                                pricing: {
                                  amount: Number(e.target.value),
                                  description: field.pricing?.description,
                                },
                              })
                            }
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm"
                          />
                        </div>
                      </label>
                      <label className="space-y-1 text-xs">
                        <span className="text-zinc-500">Notes</span>
                        <input
                          value={field.pricing?.description ?? ""}
                          onChange={(e) =>
                            updateField(field.id, {
                              pricing: {
                                amount: field.pricing?.amount ?? 0,
                                description: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm"
                          placeholder="e.g. +$10 setup"
                        />
                      </label>
                    </div>

                    {field.type === "dropdown" && data.materials.length > 0 && (
                      <div className="rounded-2xl border border-zinc-900 bg-black/30 p-3 space-y-2">
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Material Options</p>
                        <div className="grid gap-2 md:grid-cols-2">
                          {data.materials.map((material) => {
                            const selected = (field as DropdownField).options?.some((option) => option.value === material.id)
                            return (
                              <button
                                type="button"
                                key={material.id}
                                onClick={() => toggleMaterialOption(field.id, material.id)}
                                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                                  selected
                                    ? "border-primary/60 bg-primary/10 text-white"
                                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{material.name}</span>
                                  {selected && <Check className="w-4 h-4 text-primary" />}
                                </div>
                                <p className="text-xs text-zinc-500">
                                  {material.unit.replace("_", " ")} · {currency.format(material.costPerUnit)}
                                </p>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={saveProduct}
                className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white"
              >
                Save Template
              </button>
              <button
                onClick={() => draft && deleteProduct(draft.id)}
                className="text-sm text-red-400"
              >
                Delete Template
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function NewEstimateSection() {
  const { data, saveEstimate } = usePricingData()
  const [productId, setProductId] = useState<string>(data.products[0]?.id ?? "")
  const [inputs, setInputs] = useState<Record<string, any>>({})
  const [customer, setCustomer] = useState({ name: "", company: "", notes: "", status: "draft" })
  const [saveState, setSaveState] = useState<{ status: "idle" | "saved"; timestamp?: number }>({ status: "idle" })

  const template = data.products.find((product) => product.id === productId)

  const resolveDropdownOptions = (field: ProductField): DropdownOption[] => {
    if (field.type !== "dropdown") return []
    const dropdownField = field as DropdownField
    if (dropdownField.options?.length) return dropdownField.options
    if (dropdownField.optionsSource?.type === "materials") {
      return data.materials
        .filter((material) =>
          dropdownField.optionsSource?.filterUnit ? material.unit === dropdownField.optionsSource.filterUnit : true,
        )
        .filter((material) => material.active)
        .map((material) => ({ label: material.name, value: material.id, materialId: material.id }))
    }
    return []
  }

  useEffect(() => {
    if (!template) return
    const defaults: Record<string, any> = {}
    template.fields.forEach((field) => {
      if (field.type === "dimensions") {
        defaults[field.name] = field.defaultValue ?? { width: 0, height: 0, unit: "inch" }
      } else if (field.type === "checkbox" || field.type === "toggle") {
        defaults[field.name] = {
          enabled: Boolean(field.defaultValue),
          override: field.pricing?.amount ?? 0,
        }
      } else if (field.type === "dropdown") {
        const options = resolveDropdownOptions(field)
        const fallbackValue = field.defaultValue ?? options[0]?.value ?? ""
        const matched = options.find((option) => option.value === fallbackValue)
        defaults[field.name] = matched?.materialId
          ? { value: matched.value, materialId: matched.materialId }
          : fallbackValue
      } else {
        defaults[field.name] = field.defaultValue ?? ""
      }
    })
    setInputs(defaults)
  }, [template, data.materials])

  const updateField = (name: string, value: any) => {
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const normalizedInputs = useMemo(() => {
    if (!template) return inputs
    const entries = Object.entries(inputs).map(([key, val]) => {
      const field = template.fields.find((f) => f.name === key)
      if (field?.type === "checkbox" || field?.type === "toggle") {
        if (typeof val === "object") {
          return [key, Boolean(val.enabled)]
        }
      }
      return [key, val]
    })
    return Object.fromEntries(entries)
  }, [inputs, template])

  const breakdown = template ? calculatePricing({ template, inputs, store: data }) : null

  const save = () => {
    if (!template || !breakdown) return
    const record: EstimateRecord = {
      id: crypto.randomUUID(),
      estimateNumber: `EST-${String(data.estimates.length + 1).padStart(4, "0")}`,
      customerName: customer.name,
      company: customer.company,
      productId: template.id,
      productName: template.name,
      inputValues: normalizedInputs,
      pricingBreakdown: breakdown,
      finalPrice: breakdown.total,
      notes: customer.notes,
      status: customer.status as EstimateRecord["status"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveEstimate(record)
    setCustomer({ name: "", company: "", notes: "", status: "draft" })
    setSaveState({ status: "saved", timestamp: Date.now() })
    setTimeout(() => setSaveState({ status: "idle" }), 2000)
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr),360px]">
      <div className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">New Estimate</h2>
          <p className="text-sm text-zinc-500">Dynamic form adjusts per-product.</p>
        </header>

        <div className="rounded-3xl border border-zinc-900 bg-black/40 p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Product</span>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
              >
                {data.products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500">Status</span>
              <select
                value={customer.status}
                onChange={(e) => setCustomer((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Customer name"
              value={customer.name}
              onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
            />
            <input
              placeholder="Company"
              value={customer.company}
              onChange={(e) => setCustomer((prev) => ({ ...prev, company: e.target.value }))}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
            />
          </div>

          <div className="space-y-4">
            {template?.fields.map((field) => (
              <DynamicFieldInput
                key={field.id}
                field={field}
                value={inputs[field.name]}
                onChange={(value) => updateField(field.name, value)}
                options={field.type === "dropdown" ? resolveDropdownOptions(field) : undefined}
              />
            ))}
          </div>

          <textarea
            rows={3}
            placeholder="Internal notes"
            value={customer.notes}
            onChange={(e) => setCustomer((prev) => ({ ...prev, notes: e.target.value }))}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
          />

          <div className="flex justify-end">
            <button onClick={save} disabled={!breakdown} className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white disabled:opacity-40">
              Save Estimate
            </button>
          </div>
          {saveState.status === "saved" && (
            <p className="text-sm text-emerald-400 text-right">Estimate saved.</p>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-900 bg-black/60 p-6 space-y-4">
        <h3 className="text-lg font-semibold">Cost Breakdown</h3>
        {!breakdown && <p className="text-sm text-zinc-500">Fill out the product form to see pricing.</p>}
        {breakdown && (
          <div className="space-y-3">
            {breakdown.lineItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between text-sm ${Math.abs(item.amount) < 0.005 ? "text-zinc-600" : "text-white"}`}
              >
                <span className="text-zinc-400">{item.label}</span>
                <span className="font-semibold">{currency.format(item.amount)}</span>
              </div>
            ))}
            <div className="border-t border-zinc-900 pt-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{currency.format(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function DynamicFieldInput({
  field,
  value,
  onChange,
  options,
}: {
  field: ProductField
  value: any
  onChange: (value: any) => void
  options?: DropdownOption[]
}) {
  const shared = "w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"

  if (field.type === "dropdown") {
    const dropdownOptions = options ?? []
    const selectValue = typeof value === "object" && value !== null ? value.value ?? "" : (value ?? "")
    return (
      <label className="space-y-2">
        <span className="text-sm text-zinc-400">{field.label}</span>
        <select
          value={selectValue}
          onChange={(e) => {
            const selected = dropdownOptions.find((option) => option.value === e.target.value)
            if (selected?.materialId) {
              onChange({ value: selected.value, materialId: selected.materialId })
            } else {
              onChange(selected ? selected.value : e.target.value)
            }
          }}
          className={shared}
        >
          <option value="" disabled>
            Select an option
          </option>
          {dropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    )
  }

  if (field.type === "checkbox" || field.type === "toggle") {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 px-4 py-3">
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={Boolean(value?.enabled)}
            onChange={(e) => onChange({ enabled: e.target.checked, override: value?.override ?? field.pricing?.amount ?? 0 })}
            className="h-4 w-4 rounded border-zinc-700"
          />
          {field.label}
        </label>
        {field.pricing && value?.enabled && (
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
            <span>Adjustment:</span>
            <div className="flex items-center gap-1 rounded-full border border-zinc-700 px-3 py-1">
              <span>$</span>
              <input
                type="number"
                value={value?.override ?? field.pricing.amount}
                onChange={(e) =>
                  onChange({ enabled: true, override: Number(e.target.value) })
                }
                className="bg-transparent text-sm w-20"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (field.type === "dimensions") {
    const dims = value ?? { width: 0, height: 0, unit: "inch" }
    return (
      <div className="space-y-2">
        <span className="text-sm text-zinc-400">{field.label}</span>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Width"
            value={dims.width ?? 0}
            onChange={(e) => onChange({ ...dims, width: Number(e.target.value) })}
            className={shared}
          />
          <input
            type="number"
            placeholder="Height"
            value={dims.height ?? 0}
            onChange={(e) => onChange({ ...dims, height: Number(e.target.value) })}
            className={shared}
          />
          <select
            value={dims.unit ?? "inch"}
            onChange={(e) => onChange({ ...dims, unit: e.target.value })}
            className="col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
          >
            <option value="inch">Inches</option>
            <option value="foot">Feet</option>
          </select>
        </div>
      </div>
    )
  }

  return (
    <label className="space-y-2">
      <span className="text-sm text-zinc-400">{field.label}</span>
      <input
        type={field.type === "number" || field.type === "quantity" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) => onChange(field.type === "number" || field.type === "quantity" ? Number(e.target.value) : e.target.value)}
        className={shared}
      />
    </label>
  )
}

function EstimatesSection() {
  const { data, deleteEstimate, duplicateEstimate, updateEstimate } = usePricingData()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")

  const filtered = data.estimates.filter((estimate) => {
    const matchesSearch = search
      ? [estimate.customerName, estimate.company, estimate.productName, estimate.estimateNumber]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(search.toLowerCase()))
      : true
    const matchesStatus = status === "all" ? true : estimate.status === status
    return matchesSearch && matchesStatus
  })

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Saved Estimates</h2>
          <p className="text-sm text-zinc-500">Search, manage, and duplicate quotes.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-full border border-zinc-900 bg-black/40 px-4 py-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search estimates"
              className="bg-transparent text-sm focus:outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-full border border-zinc-900 bg-black/40 px-4 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="overflow-x-auto rounded-3xl border border-zinc-900 bg-black/30">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="p-4">Estimate</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filtered.map((estimate) => (
              <tr key={estimate.id}>
                <td className="p-4 font-semibold">{estimate.estimateNumber}</td>
                <td>
                  <p className="font-medium">{estimate.customerName || "—"}</p>
                  <p className="text-xs text-zinc-500">{estimate.company || ""}</p>
                </td>
                <td>{estimate.productName}</td>
                <td className="font-semibold">{currency.format(estimate.finalPrice)}</td>
                <td>
                  <select
                    value={estimate.status}
                    onChange={(e) =>
                      updateEstimate({
                        ...estimate,
                        status: e.target.value as EstimateRecord["status"],
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="rounded-full border border-zinc-800 bg-zinc-900/50 px-2 py-1 text-xs font-semibold capitalize"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(estimate.createdAt).toLocaleDateString()}</td>
                <td className="text-right space-x-2">
                  <button
                    onClick={() => duplicateEstimate(estimate.id)}
                    className="rounded-full border border-zinc-800 p-2 text-zinc-500 hover:text-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteEstimate(estimate.id)}
                    className="rounded-full border border-zinc-800 p-2 text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ReportsSection() {
  const { data } = usePricingData()
  const totals = useMemo(() => {
    const revenueByStatus = STATUS_OPTIONS.reduce(
      (acc, status) => ({
        ...acc,
        [status]: data.estimates.filter((estimate) => estimate.status === status).reduce((sum, estimate) => sum + estimate.finalPrice, 0),
      }),
      {} as Record<(typeof STATUS_OPTIONS)[number], number>,
    )
    return revenueByStatus
  }, [data.estimates])

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Reports</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {STATUS_OPTIONS.map((status) => (
          <div key={status} className="rounded-3xl border border-zinc-900 bg-black/30 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{status}</p>
            <p className="text-2xl font-semibold mt-3">{currency.format(totals[status])}</p>
            <p className="text-sm text-zinc-500 mt-1">Quoted volume</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-zinc-500">
        Export-ready CSV reporting and integrations can be layered on later. The current view summarizes topline volume by status to help the owner understand where quotes sit in the pipeline.
      </p>
    </section>
  )
}

