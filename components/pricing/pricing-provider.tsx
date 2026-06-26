"use client"

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"

import { defaultPricingData } from "@/lib/pricing/default-data"
import {
  DropdownField,
  DropdownOption,
  EstimateRecord,
  LaborRate,
  MachineRate,
  Material,
  PricingDataStore,
  PricingSettings,
  ProductField,
  ProductTemplate,
} from "@/lib/pricing/types"

const STORAGE_KEY = "ragsdale-pricing-data"
const API_ENDPOINT = "/api/pricing-state"

const cloneData = <T,>(value: T): T => JSON.parse(JSON.stringify(value))

const generateId = (prefix: string) => `${prefix}_${crypto.randomUUID()}`

interface PricingContextValue {
  data: PricingDataStore
  hydrated: boolean
  updateMaterials: (items: Material[]) => void
  upsertMaterial: (item: Partial<Material>) => void
  deleteMaterial: (id: string) => void
  updateLabor: (items: LaborRate[]) => void
  upsertLabor: (item: Partial<LaborRate>) => void
  deleteLabor: (id: string) => void
  updateMachines: (items: MachineRate[]) => void
  upsertMachine: (item: Partial<MachineRate>) => void
  deleteMachine: (id: string) => void
  updateSettings: (settings: Partial<PricingSettings>) => void
  upsertProduct: (product: Partial<ProductTemplate>) => void
  deleteProduct: (id: string) => void
  saveEstimate: (record: EstimateRecord) => void
  updateEstimate: (record: EstimateRecord) => void
  deleteEstimate: (id: string) => void
  duplicateEstimate: (id: string) => EstimateRecord | undefined
  resetData: () => void
}

const normalizeDropdownField = (field: ProductField): ProductField => {
  if (field.type !== "dropdown") return field
  const dropdownField = field as DropdownField
  const normalizedOptions = dropdownField.options?.map((option): DropdownOption => {
    if (typeof option === "string") {
      return { label: option, value: option }
    }
    return {
      label: option.label ?? option.value ?? option.materialId ?? "",
      value: option.value ?? option.label ?? option.materialId ?? "",
      materialId: option.materialId,
    }
  })
  return { ...dropdownField, options: normalizedOptions }
}

const normalizeProductTemplate = (product: ProductTemplate): ProductTemplate => ({
  ...product,
  fields: product.fields.map((field) => normalizeDropdownField(field)),
})

const normalizeStore = (store: PricingDataStore): PricingDataStore => ({
  ...store,
  settings: { ...defaultPricingData.settings, ...(store.settings ?? {}) },
  products: store.products.map((product) => normalizeProductTemplate(product)),
})

const PricingContext = createContext<PricingContextValue | null>(null)

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PricingDataStore>(() => normalizeStore(cloneData(defaultPricingData)))
  const [hydrated, setHydrated] = useState(false)
  // Whether the backend database is the source of truth. Detected from the
  // API response rather than an env var, since env vars aren't available in
  // the browser. Falls back to localStorage when no DB is configured.
  const [usingDatabase, setUsingDatabase] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(API_ENDPOINT, { cache: "no-store" })
        if (response.ok) {
          const payload = await response.json()
          if (payload?.persisted && payload?.data) {
            setData(normalizeStore(payload.data))
            setUsingDatabase(true)
            setHydrated(true)
            return
          }
          if (payload?.data) {
            // API responded but DB isn't configured; treat as non-persistent.
            setData(normalizeStore(payload.data))
          }
        }
      } catch (error) {
        console.error("Failed to load pricing data from API", error)
      }

      // Fall back to localStorage (no DB configured or API unavailable).
      const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
      if (stored) {
        try {
          const parsed: PricingDataStore = JSON.parse(stored)
          setData(normalizeStore(parsed))
        } catch (error) {
          console.error("Failed to parse stored pricing data", error)
        }
      }
      setHydrated(true)
    }
    load()
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (usingDatabase) {
      const save = async () => {
        try {
          await fetch(API_ENDPOINT, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
          })
        } catch (error) {
          console.error("Failed to persist pricing data", error)
        }
      }
      void save()
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [data, hydrated, usingDatabase])

  const upsertById = <T extends { id: string }>(items: T[], incoming: Partial<T>, prefix: string): T[] => {
    if (incoming.id) {
      let found = false
      const updated = items.map((entry) => {
        if (entry.id === incoming.id) {
          found = true
          return { ...entry, ...incoming } as T
        }
        return entry
      })
      return found ? updated : [...updated, incoming as T]
    }
    return [...items, { ...incoming, id: generateId(prefix) } as T]
  }

  const contextValue = useMemo<PricingContextValue>(() => ({
    data,
    hydrated,
    updateMaterials: (items) => setData((prev) => ({ ...prev, materials: items })),
    upsertMaterial: (item) =>
      setData((prev) => ({
        ...prev,
        materials: upsertById(
          prev.materials,
          {
            active: true,
            costPerUnit: 0,
            unit: "each",
            name: "New Material",
            ...item,
          },
          "material",
        ),
      })),
    deleteMaterial: (id) => setData((prev) => ({ ...prev, materials: prev.materials.filter((m) => m.id !== id) })),

    updateLabor: (items) => setData((prev) => ({ ...prev, labor: items })),
    upsertLabor: (item) =>
      setData((prev) => ({
        ...prev,
        labor: upsertById(prev.labor, { hourlyRate: 0, name: "New Labor", ...item }, "labor"),
      })),
    deleteLabor: (id) => setData((prev) => ({ ...prev, labor: prev.labor.filter((l) => l.id !== id) })),

    updateMachines: (items) => setData((prev) => ({ ...prev, machines: items })),
    upsertMachine: (item) =>
      setData((prev) => ({
        ...prev,
        machines: upsertById(prev.machines, { hourlyCost: 0, name: "New Machine", ...item }, "machine"),
      })),
    deleteMachine: (id) => setData((prev) => ({ ...prev, machines: prev.machines.filter((m) => m.id !== id) })),

    updateSettings: (settings) =>
      setData((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...settings },
      })),

    upsertProduct: (product) =>
      setData((prev) => ({
        ...prev,
        products: upsertById(
          prev.products,
          normalizeProductTemplate({
            id: product.id ?? generateId("product"),
            active: true,
            fields: [],
            pricingRules: {},
            name: "Untitled Product",
            ...product,
          }),
          "product",
        ),
      })),
    deleteProduct: (id) => setData((prev) => ({ ...prev, products: prev.products.filter((p) => p.id !== id) })),

    saveEstimate: (record) =>
      setData((prev) => ({
        ...prev,
        estimates: [...prev.estimates, record],
      })),
    updateEstimate: (record) =>
      setData((prev) => ({
        ...prev,
        estimates: prev.estimates.map((item) => (item.id === record.id ? record : item)),
      })),
    deleteEstimate: (id) =>
      setData((prev) => ({
        ...prev,
        estimates: prev.estimates.filter((item) => item.id !== id),
      })),
    duplicateEstimate: (id) => {
      const existing = data.estimates.find((item) => item.id === id)
      if (!existing) return undefined
      const copy: EstimateRecord = {
        ...cloneData(existing),
        id: generateId("estimate"),
        estimateNumber: `EST-${Date.now()}`,
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setData((prev) => ({ ...prev, estimates: [...prev.estimates, copy] }))
      return copy
    },
    resetData: () => setData(cloneData(defaultPricingData)),
  }), [data, hydrated])

  return <PricingContext.Provider value={contextValue}>{hydrated ? children : null}</PricingContext.Provider>
}

export const usePricingData = () => {
  const ctx = useContext(PricingContext)
  if (!ctx) throw new Error("usePricingData must be used within PricingProvider")
  return ctx
}
