import { FC } from "react"
import Image from "next/image"
import formatAddress from "@/app/utils/format-address"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"

type AccountProps = {
  avatar: string
  name: string
  icon: string
}
const Account: FC<AccountProps> = ({ avatar, name, icon }) => {
  return (
    <div className="border-b-1 border-[rgba(0,0,0,0.06)] py-4 flex items-center">
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

const Profile: FC = () => {
  return (
    <div className="bg-white rounded-lg border-[rgba(0,0,0,0.06)] border p-5 text-[#2F2F2F]">
      <div className="overflow-hidden rounded-full h-16 w-16">
        <Image height="64" width="64" src="/default-avatar.jpg" alt="Avatar" />
      </div>
      <span className="mt-3 font-semibold text-sm mb-5">0xabcd</span>
      <Address address="0xabccd2c9efabccd2c9efabccd2c9efabccd2c9ef" />
      <Address address="0xabccd2c9efabccd2c9efabccd2c9efabccd2c9ef" />
      <Link href="/feed" passHref legacyBehavior>
        <a className="block rounded-lg bg-[#F7F7FA] px-4 py-[0.375rem] flex items-center justify-between my-5">
          <span>Activity Feed</span>
          <span className="text-black opcaity-40">
            <IoIosArrowRoundForward className="inline" />
          </span>
        </a>
      </Link>
      <div className="-mx-5 border-b-2 border-[rgba(0,0,0,0.06)] my-5"></div>
      <p className="font-semibold">Profile</p>
      <Account avatar="/default-avatar.jpg" name="account" icon="/accounts/twitter.png" />
    </div>
  )
}

export default Profile
