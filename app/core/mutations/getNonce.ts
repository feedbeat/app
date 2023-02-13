import { resolver } from "@blitzjs/rpc"
import { generateNonce } from "siwe"

export default resolver.pipe(async (_, ctx) => {
  const nonce = generateNonce()
  await ctx.session.$setPrivateData({ nonce })
  return nonce
})
