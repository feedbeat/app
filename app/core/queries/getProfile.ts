import { Ctx } from "blitz"
import db from "db"
import { getLensProfile } from "../tasks/fetchLens"
import { getTwitterProfile } from "../tasks/fetchTwitter"

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

  if (!user) return null

  const lens = await getLensProfile(user.Account.find((e) => e.type === "ETH_WALLET")!.identity)
  const twitter = await getTwitterProfile(
    user.Account.find((e) => e.type === "ETH_WALLET")!.identity
  )

  return { ...user, lens, twitter }
}
