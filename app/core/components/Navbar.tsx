import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { FC } from "react"
import { useAccount, useChainId } from "wagmi"
import useUser from "../hooks/useUser"
import User from "./User"

const Navbar: FC = () => {
  const { startLogin, isLoggedIn } = useUser()
  return (
    <nav className="bg-[#171717] w-full fixed top-0">
      <div className="mx-auto px-6 py-4 flex justify-between">
        <Link href="/" passHref legacyBehavior>
          <a className="text-white font-extrabold text-3xl">feadbeats</a>
        </Link>
        {isLoggedIn ? (
          <User />
        ) : (
          <button
            className="h-9 w-36 rounded-full text-white border-white border font-light"
            onClick={startLogin}
          >
            Sign up
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
