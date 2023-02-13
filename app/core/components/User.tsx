import Link from "next/link"
import Image from "next/image"
import { FC } from "react"
import { useAccount, useEnsAvatar, useEnsName } from "wagmi"
import formatAddress from "@/app/utils/format-address"

const User: FC = () => {
  const { address } = useAccount()
  const { data: avatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  return (
    <Link href="/profile" passHref legacyBehavior>
      <a className="inline-flex items-center -my-[1rem]">
        <div className="rounded-full w-[3rem] h-[3rem] overflow-hidden border-4 border-[#36322D] box-content">
          <Image src={avatar || "/default-avatar.jpg"} width={48} height={48} alt="User avatar" />
        </div>
        <div className="rounded-full bg-[#242221] -ml-[2rem] h-[3rem] w-[11.5rem] pl-[2.25rem] flex flex-col justify-center">
          <p className="text-white font-semibold text-xl leading-5">{ensName}</p>
          <p className="text-[#FF7A2F] font-bold text-sm leading-4">{formatAddress(address)}</p>
        </div>
      </a>
    </Link>
  )
}

export default User
