import { fetchEnsName } from "@wagmi/core"
import { Ctx } from "blitz"
import db from "db"
import { getLensProfile } from "../tasks/fetchLens"
import { getTwitterProfile } from "../tasks/fetchTwitter"

export default async function getMyProfile(_ = null, { session }: Ctx) {
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

  const primary = user.Account.find((e) => e.type === "ETH_WALLET")!.identity
  const lens = await getLensProfile(primary)
  const twitter = await getTwitterProfile(primary)
  const ens = await fetchEnsName({ address: primary as `0x${string}` })

  return { user, lens, twitter, ens }
}
