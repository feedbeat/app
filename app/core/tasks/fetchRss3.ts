import axios from "axios"
import { ActivityProps } from "../components/Activity"

type FetchRss3Result = {
  cursor: string | null
  events: Array<ActivityProps & { tx: string }>
}

const PhiAddresses = [
  "0x3d8c06e65ebf06a9d40f313a35353be06bd46038",
  "0x017bd973fe4d3e0f81bab69bccccb44679d86eab",
]

function filterAndTransform(records: any[]): Array<ActivityProps & { tx: string }> {
  const transformed: Array<ActivityProps & { tx: string }> = []

  records.forEach((record) => {
    record.actions.forEach((action) => {
      if (PhiAddresses.includes(action.metadata?.contract_address)) {
        if (action.type === "mint") {
          transformed.push({
            type: "Mint",
            name: action.metadata.name,
            image: action.metadata.image,
            networkIcon: "/networks/polygon.png",
            description: action.metadata.description,
            time: new Date(record.timestamp),
            tx: record.hash,
            to: action.address_to,
          })
        } else if (action.type === "transfer") {
          transformed.push({
            type: "Send",
            name: action.metadata.name,
            image: action.metadata.image,
            networkIcon: "/networks/polygon.png",
            description: action.metadata.description,
            time: new Date(record.timestamp),
            from: action.address_from,
            to: action.address_to,
            tx: record.hash,
          })
        }
      }
    })
  })

  return transformed
}

async function fetchRss3(
  addresses: string[],
  limit: number = 10,
  cursor_?: string
): Promise<FetchRss3Result> {
  const returning: FetchRss3Result = {
    cursor: null,
    events: [],
  }
  let cursor = cursor_
  do {
    const { data } = await axios.post("https://api.rss3.io/v1/notes", {
      address: addresses,
      tag: ["collectible"],
      limit: 100,
      refresh: false,
      include_poap: false,
      ignore_contract: false,
      count_only: false,
      query_status: false,
      cursor,
    })
    const { result } = data
    const filtered = filterAndTransform(result)
    returning.events.push(...filtered)

    if (result.length < 200) {
      returning.cursor = null
      break
    }

    cursor = data.cursor
  } while (returning.events.length < limit)

  returning.cursor = cursor || null
  if (returning.events.length > limit) {
    returning.cursor = returning.events[limit - 1]!.tx
    returning.events.length = limit
  } else if (returning.events.length < limit) {
    returning.cursor = null
  }

  return returning
}

export default fetchRss3
