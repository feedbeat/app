import db from "db"
import fetchRss3 from "../tasks/fetchRss3"

export default async function getFeed(profileId: number | string, cursor: string, limit = 10) {
  let addresses: string[] = []
  if (typeof profileId === "number") {
    const profile = await db.user.findFirst({
      where: { id: profileId },
      include: { Account: true },
    })
    addresses = profile?.Account.map((e) => (e.type === "ETH_WALLET" ? e.identity : null)).filter(
      (e) => !!e
    ) as string[]
  } else {
    addresses = [profileId]
  }

  return fetchRss3(addresses)
}
