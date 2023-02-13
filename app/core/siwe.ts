import { SiweMessage } from "siwe"

export function getLoginMessage(address: string, nonce: string) {
  return new SiweMessage({
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    address,
    statement: "Sign in with Ethereum to Feedbeats.",
    nonce,
    uri: process.env.NEXT_PUBLIC_LOGIN_URI,
    version: "1",
    chainId: 1,
  })
}
