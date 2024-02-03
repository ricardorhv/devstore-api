import { z } from 'zod'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const headersList = headers()

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

  return Response.json(
    { cartItems, total },
    {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
    },
  )
}
