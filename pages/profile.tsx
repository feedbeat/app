import Account from "@/app/core/components/Account"
import useUser from "@/app/core/hooks/useUser"
import addAccount from "@/app/core/mutations/addAccount"
import getNonce from "@/app/core/mutations/getNonce"
import { getLoginMessage } from "@/app/core/siwe"
import formatAddress from "@/app/utils/format-address"
import { BlitzPage } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import Layout from "app/core/layouts/Layout"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { IoAddOutline } from "react-icons/io5"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"

const Profile: BlitzPage = () => {
  const { profile } = useUser()
  const { address } = useAccount()
  const [getNonceMutation] = useMutation(getNonce)
  const [addAccountMutation] = useMutation(addAccount)
  const { disconnectAsync } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const [connecting, setConnecting] = useState(false)
  const { signMessageAsync } = useSignMessage()

  const addEthWallet = useCallback(async () => {
    if (!address) return
    const nonce = await getNonceMutation()
    const message = getLoginMessage(address, nonce)
    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    })
    await addAccountMutation({
      type: "ETH_WALLET",
      identity: JSON.stringify(message),
      challenge: signature,
    })
  }, [addAccountMutation, address, getNonceMutation, signMessageAsync])

  useEffect(() => {
    if (connecting && address) {
      addEthWallet().catch(console.error)
    }
  }, [addEthWallet, address, connecting])

  return (
    <Layout>
      <div className="min-h-full bg-cover bg-bottom text-white pt-[8.5rem] px-12 pb-16">
        <h2 className="font-extrabold text-4xl mb-[6rem]">Set up your account</h2>
        <div className="mt-10">
          <h3 className="font-semibold text-xl mb-4">Ethereum</h3>
          <div className="flex flex-wrap gap-8">
            {profile?.user.Account.filter((e) => e.type === "ETH_WALLET").map((account) => (
              <Account
                icon="/metamask-icon.png"
                text={formatAddress(account.identity)}
                onRemove={() => {}}
                alt="Ethereum Wallet"
                key={account.identity}
              />
            ))}
            <button
              className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2"
              onClick={async () => {
                await disconnectAsync()
                setConnecting(true)
                openConnectModal?.()
              }}
            >
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
            {profile?.lens && profile?.lens.name ? (
              <Account
                icon="/lens-icon.png"
                text={profile?.lens.name}
                onRemove={() => {
                  window.open("https://www.lensfrens.xyz/", "_blank", "noopener")
                }}
                alt="Lens Account"
              />
            ) : (
              <Link href="https://www.lensfrens.xyz/" passHref legacyBehavior>
                <a className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2">
                  <IoAddOutline />
                  <span>Add Lens</span>
                </a>
              </Link>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4">Twitter</h3>
            {profile?.twitter ? (
              <Account
                icon="/accounts/twitter.png"
                text={profile.twitter.identity}
                onRemove={() => {
                  window.open("https://mask.io/", "_blank", "noopener")
                }}
                alt="Twitter Account"
              />
            ) : (
              <Link href="https://mask.io/" passHref legacyBehavior>
                <a className="rounded-full border-2 border-white px-6 py-2 flex items-center my-2">
                  <IoAddOutline />
                  <span>Add Twitter</span>
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="text-right mt-48 pr-12">
          <Link href="/feed" passHref legacyBehavior>
            <a className="bg-[#FF2E00] font-extrabold text-2xl px-16 py-4 rounded-3xl">
              Completed!
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
