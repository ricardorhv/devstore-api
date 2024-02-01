import fs from 'fs'
import { z } from 'zod'

export async function POST(request: Request) {
  const productCartSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    price: z.number(),
    image: z.string(),
    description: z.string(),
    featured: z.boolean(),
    shirtSize: z.enum(['P', 'M', 'G', 'GG']),
    quantity: z.number(),
    subtotal: z.number(),
  })

  const orderSchema = z.object({
    cartItems: z.array(productCartSchema),
    total: z.number(),
  })

  const { cartItems, total } = orderSchema.parse(await request.json())

  return Response.json({ cartItems, total }, { status: 200 })
}
