import { useMutation, useQuery } from "@blitzjs/rpc"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useCallback, useEffect, useState } from "react"
import { useAccount, useSignMessage } from "wagmi"
import getNonce from "../mutations/getNonce"
import login from "../mutations/login"
import getMyProfile from "../queries/getMyProfile"
import { getLoginMessage } from "../siwe"

const useUser = () => {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [profile] = useQuery(getMyProfile, null)
  const [getNonceMutation] = useMutation(getNonce)
  const [loginMutation] = useMutation(login)
  const { signMessageAsync } = useSignMessage()
  const [loginOnConnected, setLoginOnConnected] = useState(true)

  const _login = useCallback(
    async function () {
      if (!address || !!profile) return
      const nonce = await getNonceMutation()
      const message = getLoginMessage(address, nonce)
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      await loginMutation({ signature, message: JSON.stringify(message) })
    },
    [address, getNonceMutation, loginMutation, profile, signMessageAsync]
  )

  useEffect(() => {
    if (address && loginOnConnected) {
      _login().catch(console.error)
      setLoginOnConnected(false)
    }
  }, [_login, address, getNonceMutation, loginMutation, loginOnConnected, signMessageAsync])

  return {
    isConnected: !!address,
    isLoggedIn: !!profile,
    address,
    profile,
    startLogin: () => {
      if (address) {
        _login().catch(console.error)
      } else {
        openConnectModal?.()
      }
    },
  }
}

export default useUser
