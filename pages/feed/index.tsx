import Activity from "@/app/core/components/Activity"
import Pagination from "@/app/core/components/Pagination"
import Profile from "@/app/core/components/Profile"
import getFeed from "@/app/core/queries/getFeed"
import getMyProfile from "@/app/core/queries/getMyProfile"
import getProfile from "@/app/core/queries/getProfile"
import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MyFeed: BlitzPage = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [cursors, setCursors] = useState<string[]>([])
  const router = useRouter()
  const [profile, { isLoading }] = useQuery(getMyProfile, null)
  const [feed] = useQuery(getFeed, {
    profileId: profile?.user.id,
    cursor,
    limit: 10,
  })

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
              <Activity key={`event-${cursor}-${idx}`} {...event} />
            ))}
          </div>
          <Pagination
            className="pl-16 mt-10"
            onPrev={() => {
              if (cursor !== undefined) setCursor(cursors[cursors.indexOf(cursor) - 1])
            }}
            onNext={() => {
              if (feed.cursor) {
                setCursor(feed.cursor)
                if (!cursors.includes(feed.cursor)) setCursors((e) => [...e, feed.cursor!])
              }
            }}
            prev={cursor !== undefined}
            next={!!feed.cursor}
          />
        </div>
        <div className="w-[32.5rem] mt-2 text-[#2F2F2F]">
          {profile ? <Profile profile={profile} /> : null}
        </div>
      </div>
    </Layout>
  )
}

export default MyFeed
