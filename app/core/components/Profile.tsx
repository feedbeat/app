import { FC } from "react"
import Image from "next/image"
import formatAddress from "@/app/utils/format-address"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"
import useUser from "../hooks/useUser"
import { useQuery } from "@blitzjs/rpc"
import getProfile from "../queries/getProfile"
import { LensProfile } from "../tasks/fetchLens"
import { TwitterProfile } from "../tasks/fetchTwitter"
import { FetchEnsNameResult } from "@wagmi/core"
import { useEnsAvatar } from "wagmi"

type AccountProps = {
  avatar: string
  name: string
  icon: string
}
const Account: FC<AccountProps> = ({ avatar, name, icon }) => {
  return (
    <div className="border-b border-[rgba(0,0,0,0.06)] py-4 flex items-center">
      <div className="overflow-hidden rounded-full mr-3 h-8 w-8">
        <Image height="32" width="32" src={avatar} alt="Avatar" />
      </div>
      <span className="text-sm mr-8">{name}</span>
      <Image height="16" width="16" src={icon} alt="Avatar" />
    </div>
  )
}

type AddressProps = { address: string }
const Address: FC<AddressProps> = ({ address }) => {
  return (
    <div className="text-sm flex items-center gap-2 my-[0.375rem]">
      <span>{formatAddress(address)}</span>
      <span className="cursor-pointer">
        <CopyToClipboard text={address}>
          <Image height="14" width="14" src="/copy-to-clipboard.png" alt="Copy" />
        </CopyToClipboard>
      </span>
    </div>
  )
}

type ProfileProps = {
  profile: {
    lens: LensProfile | null
    twitter: TwitterProfile | null
    ens: FetchEnsNameResult
    Account: { id: number; type: string; identity: string }[]
    id: number
    name: string | null
  }
}
const Profile: FC<ProfileProps> = ({ profile }) => {
  const primary = profile.Account.find((e) => e.type === "ETH_WALLET")!.identity
  const { data: ensAvatar } = useEnsAvatar({ address: primary as `0x${string}` })

  const avatar = ensAvatar || "/default-avatar.jpg"
  return (
    <div className="bg-white rounded-lg border-[rgba(0,0,0,0.06)] border p-5 text-[#2F2F2F]">
      <div className="overflow-hidden rounded-full h-16 w-16">
        <Image height="64" width="64" src={avatar} alt="Avatar" />
      </div>
      <span className="mt-3 font-semibold text-sm mb-5">{profile.ens}</span>
      {profile.Account.filter((e) => e.type === "ETH_WALLET").map((acc) => (
        <Address address={acc.identity} key={acc.id} />
      ))}
      <Link href={`/feed/${profile.id}`} passHref legacyBehavior>
        <a className="block rounded-lg bg-[#F7F7FA] px-4 py-[0.375rem] flex items-center justify-between my-5">
          <span>Activity Feed</span>
          <span className="text-black opcaity-40">
            <IoIosArrowRoundForward className="inline" />
          </span>
        </a>
      </Link>
      <div className="-mx-5 border-b-2 border-[rgba(0,0,0,0.06)] my-5"></div>
      <p className="font-semibold">Profile</p>
      {profile.twitter ? (
        <Account avatar={avatar} name={profile.twitter.identity} icon="/accounts/twitter.png" />
      ) : null}
      {profile.lens ? (
        <Account
          avatar={
            profile.lens.picture?.original.url.replace("ipfs://", "https://ipfs.io/ipfs/") || avatar
          }
          name={profile.lens.name}
          icon="/accounts/lens.png"
        />
      ) : null}
      {profile.ens ? <Account avatar={avatar} name={profile.ens} icon="/accounts/ens.png" /> : null}
    </div>
  )
}

export default Profile
