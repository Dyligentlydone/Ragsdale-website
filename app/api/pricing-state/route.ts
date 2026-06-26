import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { defaultPricingData } from "@/lib/pricing/default-data"
import { PricingDataStore } from "@/lib/pricing/types"
import { Prisma } from "@prisma/client"

const STATE_ID = 1
const hasDatabase = Boolean(process.env.DATABASE_URL)

const cloneDefault = (): PricingDataStore => JSON.parse(JSON.stringify(defaultPricingData))

export async function GET() {
  if (!hasDatabase) {
    return NextResponse.json({ data: cloneDefault(), persisted: false })
  }

  try {
    const record = await prisma.pricingState.findUnique({ where: { id: STATE_ID } })
    if (!record) {
      const data = cloneDefault()
      await prisma.pricingState.create({ data: { id: STATE_ID, data: data as unknown as Prisma.InputJsonValue } })
      return NextResponse.json({ data, persisted: true })
    }
    return NextResponse.json({ data: record.data as unknown as PricingDataStore, persisted: true })
  } catch (error) {
    console.error("Failed to load pricing state", error)
    return NextResponse.json({ error: "Failed to load pricing data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!hasDatabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    if (!body || typeof body !== "object" || !body.data) {
      return NextResponse.json({ error: "Missing data payload" }, { status: 400 })
    }

    const payload = body.data as PricingDataStore
    await prisma.pricingState.upsert({
      where: { id: STATE_ID },
      create: { id: STATE_ID, data: payload as unknown as Prisma.InputJsonValue },
      update: { data: payload as unknown as Prisma.InputJsonValue },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save pricing state", error)
    return NextResponse.json({ error: "Failed to save pricing data" }, { status: 500 })
  }
}
