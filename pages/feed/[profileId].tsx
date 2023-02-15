import Account from "@/app/core/components/Account"
import Activity from "@/app/core/components/Activity"
import Pagination from "@/app/core/components/Pagination"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { useEffect, useState } from "react"
import { IoAddOutline } from "react-icons/io5"
import Profile from "@/app/core/components/Profile"
import { useQuery } from "@blitzjs/rpc"
import getProfile from "@/app/core/queries/getProfile"
import { useRouter } from "next/router"
import getFeed from "@/app/core/queries/getFeed"
import { useEnsAvatar } from "wagmi"

function parseProfileId(profileId: string) {
  if (profileId.startsWith("0x")) return profileId
  return parseInt(profileId)
}
const Feed: BlitzPage = () => {
  const [page, setPage] = useState(1)
  const router = useRouter()
  const { profileId } = router.query
  const parsedProfileId = parseProfileId(
    (Array.isArray(profileId) ? profileId[0] : profileId) || "1"
  )
  const [profile, { isLoading }] = useQuery(getProfile, parsedProfileId)
  const [feed] = useQuery(getFeed, parsedProfileId)
  const primary =
    typeof profile?.user === "string"
      ? profile?.user
      : profile?.user.Account.find((e) => e.type === "ETH_WALLET")!.identity
  const { data: ensAvatar } = useEnsAvatar({ address: primary as `0x${string}` | undefined })
  const avatar = ensAvatar || "/default-avatar.jpg"

  useEffect(() => {
    if (!isLoading && !profile) router.push("/").catch(console.error)
  }, [isLoading, profile, router])

  return (
    <Layout>
      <div className="min-h-full bg-cover bg-bottom text-white pt-[8.25rem] px-12 pb-16 flex flex-wrap flex-row justify-between">
        <div className="w-[44.5rem]">
          <h2 className="font-extrabold text-4xl mb-[6rem]">Activity feed</h2>
          <div className="mt-5">
            {feed.events.map((event, idx) => (
              <Activity key={`event-${idx}`} {...event} />
            ))}
          </div>
          <Pagination
            className="pl-16 mt-10"
            rangeStart={1}
            rangeEnd={6}
            end={8}
            onGo={setPage}
            current={page}
          />
        </div>
        <div className="w-[32.5rem] mt-2 text-[#2F2F2F]">
          {profile ? <Profile profile={profile} /> : null}
        </div>
      </div>
    </Layout>
  )
}

export default Feed
