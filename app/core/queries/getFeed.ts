import { Ctx } from "@blitzjs/next"
import db from "db"
import { getLensFollowingAddress } from "../tasks/fetchLens"
import fetchRss3 from "../tasks/fetchRss3"

type GetFeedParam = {
  profileId?: number | string
  limit: number
  cursor?: string
}
export default async function getFeed(
  { profileId, limit, cursor }: GetFeedParam,
  { session }: Ctx
) {
  let addresses: string[] = []
  if (!profileId || typeof profileId === "number") {
    if (!profileId) {
      profileId = session.userId as number
    }
    const profile = await db.user.findFirst({
      where: { id: profileId as number },
      include: { Account: true },
    })
    addresses = profile?.Account.map((e) => (e.type === "ETH_WALLET" ? e.identity : null)).filter(
      (e) => !!e
    ) as string[]
  } else {
    addresses = [profileId]
  }
  const followings = await Promise.all(addresses.map(getLensFollowingAddress))

  return fetchRss3([...followings.flat(), ...addresses], limit, cursor)
}
