import { useConnectModal } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { FC } from "react"
import { useAccount } from "wagmi"
import User from "./User"

const Navbar: FC = () => {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  return (
    <nav className="bg-[#171717] w-full fixed top-0">
      <div className="mx-auto px-6 py-4 flex justify-between">
        <Link href="/" passHref legacyBehavior>
          <a className="text-white font-extrabold text-3xl">feadbeats</a>
        </Link>
        {address ? (
          <User />
        ) : (
          <button
            className="h-9 w-36 rounded-full text-white border-white border font-light"
            onClick={openConnectModal}
          >
            Sign up
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
