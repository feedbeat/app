import axios from "axios"
import { ActivityProps } from "../components/Activity"

type FetchRss3Result = {
  cursor: string | null
  events: Array<ActivityProps & { tx: string }>
}

function filterAndTransform(records: any[]): Array<ActivityProps & { tx: string }> {
  const transformed: Array<ActivityProps & { tx: string }> = []

  records.forEach((record) => {
    record.actions.forEach((action) => {
      if (action.metadata?.contract_address === "0x017bd973fe4d3e0f81bab69bccccb44679d86eab") {
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
  limit: number = 100,
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
      limit: 200,
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

  if (returning.events.length > limit) {
    cursor = returning.events[limit - 1]!.tx
    returning.events.length = limit
  }

  return returning
}

export default fetchRss3
