import db from "@/db"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import { SiweMessage } from "siwe"

type LoginFields = {
  message: string
  signature: string
}

export default resolver.pipe(async ({ message, signature }: LoginFields, ctx) => {
  const { nonce } = await ctx.session.$getPrivateData()
  const fields = await new SiweMessage(JSON.parse(message)).validate(signature)

  if (fields.nonce !== nonce) throw new AuthenticationError()

  const account = await db.account.findFirst({
    where: {
      identity: fields.address,
      type: "ETH_WALLET",
    },
    include: {
      user: true,
    },
  })

  if (!account) {
    const user = await db.user.create({ data: { name: fields.address } })
    const newAccount = await db.account.create({
      data: {
        identity: fields.address,
        type: "ETH_WALLET",
        userId: user.id,
      },
      include: { user: true },
    })

    await ctx.session.$create({ userId: newAccount.user.id })
    return newAccount.user
  } else {
    await ctx.session.$create({ userId: account.user.id })
    return account.user
  }
})
