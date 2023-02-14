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
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
    }
  }
`

export type LensProfile = {
  id: string
  name: string
  picture: {
    original: {
      url: string
    }
  } | null
}

export const getLensProfile = async (address: string): Promise<LensProfile | null> => {
  const response = await urqlClient
    .query(profileQuery, { address }, { requestPolicy: "network-only" })
    .toPromise()
  return response.data.defaultProfile as LensProfile | null
}
