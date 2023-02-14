import { createClient } from "urql"
import { gql } from "@urql/core"

const APIURL = "https://api.lens.dev/"

export const urqlClient = createClient({
  url: APIURL,
})

const profileQuery = gql`
  query Profile($address: EthereumAddress!) {
    defaultProfile(request: { ethereumAddress: $address }) {
      id
      name
    }
  }
`

type DefaultProfile = { id: string; name: string }

export const getLensProfile = async (address: string): Promise<DefaultProfile | null> => {
  const response = await urqlClient
    .query(profileQuery, { address }, { requestPolicy: "network-only" })
    .toPromise()
  return response.data.defaultProfile as DefaultProfile | null
}
