import Account from "@/app/core/components/Account"
import Activity from "@/app/core/components/Activity"
import Pagination from "@/app/core/components/Pagination"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { useState } from "react"
import { IoAddOutline } from "react-icons/io5"
import Profile from "@/app/core/components/Profile"

const Feed: BlitzPage = () => {
  const [page, setPage] = useState(1)
  return (
    <Layout>
      <div className="min-h-full bg-cover bg-bottom text-white pt-[8.25rem] px-12 pb-16 flex flex-wrap flex-row justify-between">
        <div className="w-[44.5rem]">
          <h2 className="font-extrabold text-4xl mb-[6rem]">Activity feed</h2>
          <div className="mt-5">
            <Activity
              avatar="/default-avatar.jpg"
              name="Default"
              address="0x123456789a123456789a123456789a123456789a"
              event={{
                type: "Mint",
                name: "Some",
                image: "/example-nft.png",
                networkIcon: "/networks/polygon.png",
                description: "eqewqe",
              }}
            />
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
          <Profile />
        </div>
      </div>
    </Layout>
  )
}

export default Feed
