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

const followingQuery = gql`
  query Following($address: EthereumAddress!, $cursor: Cursor) {
    following(request: { address: $address, cursor: $cursor }) {
      items {
        profile {
          ownedBy
        }
      }
      pageInfo {
        next
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

export const getLensFollowingAddress = async (address: string): Promise<Array<string>> => {
  const result: Array<string> = []
  let cursor: string | undefined = undefined

  do {
    const response = await urqlClient
      .query(followingQuery, { address, cursor }, { requestPolicy: "network-only" })
      .toPromise()

    result.push(...response.data.following.items.map((e) => e.profile.ownedBy))
    cursor = response.data.following.pageInfo.next
  } while (cursor)

  return result
}
