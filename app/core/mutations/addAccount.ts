import db from "@/db"
import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { AuthorizationError } from "blitz"
import { SiweMessage } from "siwe"

type AddAccountFields = {
  type: string
  identity: string
  challenge: string
}

async function validateEthWallet(identity: string, challenge: string, ctx: Ctx) {
  if (!ctx.session.userId) throw new AuthorizationError()

  const { nonce } = await ctx.session.$getPrivateData()
  const fields = await new SiweMessage(JSON.parse(identity)).validate(challenge)

  if (fields.nonce !== nonce) throw new Error("Nonce invalid")

  const account = await db.account.findFirst({
    where: {
      identity: fields.address,
      type: "ETH_WALLET",
    },
  })

  if (account) throw new Error("Address already used")

  const newAccount = await db.account.create({
    data: {
      identity: fields.address,
      type: "ETH_WALLET",
      userId: ctx.session.userId,
    },
    include: { user: true },
  })

  return newAccount
}

export default resolver.pipe(async ({ type, identity, challenge }: AddAccountFields, ctx) => {
  if (type === "ETH_WALLET") return validateEthWallet(identity, challenge, ctx)

  return new Error("Unknown type")
})
