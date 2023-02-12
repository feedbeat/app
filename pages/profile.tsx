import Account from "@/app/core/components/Account"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { IoAddOutline } from "react-icons/io5"

const Profile: BlitzPage = () => {
  return (
    <Layout>
      <div className="min-h-full bg-cover bg-bottom text-white pt-[8.5rem] px-12 pb-16">
        <h2 className="font-extrabold text-4xl mb-[6rem]">Set up your account</h2>
        <div className="mt-10">
          <h3 className="font-semibold text-xl mb-4">Ethereum</h3>
          <div className="flex flex-wrap gap-8">
            <Account
              icon="/metamask-icon.png"
              text="0x12...abcd"
              onRemove={() => {}}
              alt="Metamask Wallet"
            />
            <button className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2">
              <IoAddOutline />
              <span>Add Wallet</span>
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="font-semibold text-xl mb-4">Starknet</h3>
          <div className="flex flex-wrap gap-8">
            <button
              className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2 opacity-70"
              disabled
            >
              <span>Coming Soon</span>
            </button>
          </div>
        </div>
        <div className="mt-10 flex gap-28">
          <div>
            <h3 className="font-semibold text-xl mb-4">Lens</h3>
            <button className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2">
              <IoAddOutline />
              <span>Add Lens</span>
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4">Twitter</h3>
            <button className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2">
              <IoAddOutline />
              <span>Add Twitter</span>
            </button>
          </div>
        </div>
        <div className="text-right mt-48 pr-12">
          <button className="bg-[#FF2E00] font-extrabold text-2xl px-16 py-4 rounded-3xl">
            Completed!
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
