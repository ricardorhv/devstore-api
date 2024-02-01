import fs from 'fs'
import { z } from 'zod'

export async function GET() {
  const itemSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
  })

  const orderSchema = z.object({
    id: z.number(),
    items: z.array(itemSchema),
  })

  const ordersListSchema = z.object({
    orders: z.array(orderSchema),
  })

  const data = fs.readFileSync('./src/app/api/orders/data.json')
  const { orders } = ordersListSchema.parse(JSON.parse(data.toString()))

  const newOrder = {
    id: 1,
    items: [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
      },
    ],
  }

  orders.push(newOrder)

  fs.writeFile(
    './src/app/api/orders/data.json',
    JSON.stringify(orders),
    (err) => {
      if (err) console.log(err)
    },
  )

  return Response.json(orders)
}
