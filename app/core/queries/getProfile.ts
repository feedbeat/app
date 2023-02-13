import { Ctx } from "blitz"
import db from "db"

export default async function getProfile(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId as number },
    select: {
      id: true,
      name: true,
      Account: true,
    },
  })

  return user
}