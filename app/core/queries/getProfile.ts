import { fetchEnsName } from "@wagmi/core"
import db, { Account } from "db"
import { isAddress } from "ethers/lib/utils.js"
import { getLensProfile } from "../tasks/fetchLens"
import { getTwitterProfile } from "../tasks/fetchTwitter"

type ProfileUser =
  | {
      id: number
      name: string | null
      Account: Account[]
    }
  | string

export default async function getProfile(profileIdOrAddress: number | string) {
  let primary: string = ""
  let user: ProfileUser
  if (typeof profileIdOrAddress === "number") {
    const result = await db.user.findFirst({
      where: { id: profileIdOrAddress },
      select: {
        id: true,
        name: true,
        Account: true,
      },
    })

    if (!result) return null
    user = result

    primary = user.Account.find((e) => e.type === "ETH_WALLET")!.identity
  } else {
    if (isAddress(profileIdOrAddress)) primary = profileIdOrAddress
    user = profileIdOrAddress
  }
  const lens = await getLensProfile(primary)
  const twitter = await getTwitterProfile(primary)
  const ens = await fetchEnsName({ address: primary as `0x${string}` })

  return { user, lens, twitter, ens }
}
