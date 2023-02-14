import axios from "axios"

const APIURL = "https://proof-service.next.id/"

export type TwitterProfile = {
  platform: "twitter"
  identity: string
}
export const getTwitterProfile = async (address: string): Promise<TwitterProfile | null> => {
  const { data } = await axios.get(
    `${APIURL}v1/proof?platform=ethereum&exact=true&identity=${address}`
  )
  if (!data) return null

  const twitterProof = data.ids?.[0].proofs.find((e) => e.platform === "twitter")
  if (!twitterProof) return null

  return twitterProof
}
