import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request, res: Response) {
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

  const orders = orderSchema.parse(await request.json())

  if (request.method === 'OPTIONS') {
    return NextResponse.json(
      { message: 'Conseguiu' },
      {
        status: 200,
      },
    )
  }

  return NextResponse.json(
    { message: 'Conseguiu' },
    {
      status: 200,
    },
  )
}
