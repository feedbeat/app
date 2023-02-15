import formatAddress from "@/app/utils/format-address"
import Image from "next/image"
import { FC } from "react"
import intlFormatDistance from "date-fns/intlFormatDistance"
import { useEnsAvatar, useEnsName } from "wagmi"

export type ActivityProps = MintActivityProps | SendActivityProps

type MintActivityProps = {
  type: "Mint"
  name: string
  image: string
  networkIcon: string
  description: string
  time: Date
  to: string
}
type SendActivityProps = {
  type: "Send"
  name: string
  image: string
  networkIcon: string
  description: string
  time: Date
  from: string
  to: string
}

const MintActivity: FC<MintActivityProps> = (props) => {
  const { data: avatar } = useEnsAvatar({ address: props.to as `0x${string}` | undefined })
  const { data: name } = useEnsName({ address: props.to as `0x${string}` | undefined })

  return (
    <div className="rounded-xl border-white p-3 border flex gap-x-2">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <Image width="56" height="56" src={avatar || "/default-avatar.jpg"} alt="Avatar" />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold mr-1">{name}</span>
          <span className="text-sm text-[#828282] mr-5">{formatAddress(props.to)}</span>
          <Image width="38" height="19" src="/events/mint-event.svg" alt="Mint event" />
          <span className="ml-2">Minted an NFT</span>
        </div>
        <div className="flex mt-3 gap-5">
          <Image width="70" height="70" src="/example-nft.png" alt="Token image" />
          <div>
            <div className="flex align-center">
              <span className="font-bold text-sm mr-3">{props.name}</span>
              <p>
                <Image width="16" height="16" src={props.networkIcon} alt="Mint event" />
              </p>
              <span className="ml-2 text-sm">
                {intlFormatDistance(props.time, new Date(), { locale: "en" })}
              </span>
            </div>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const SendActivity: FC<SendActivityProps> = (props) => {
  const { data: avatar } = useEnsAvatar({ address: props.from as `0x${string}` | undefined })
  const { data: name } = useEnsName({ address: props.from as `0x${string}` | undefined })
  const { data: to } = useEnsName({ address: props.to as `0x${string}` | undefined })

  return (
    <div className="rounded-xl border-white p-3 border flex gap-x-2">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <Image width="56" height="56" src={avatar || "/default-avatar.jpg"} alt="Avatar" />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold mr-1">{name}</span>
          <span className="text-sm text-[#828282] mr-5">{formatAddress(props.from)}</span>
          <Image width="38" height="19" src="/events/mint-event.svg" alt="Mint event" />
          <span className="mx-2">Send an NFT to</span>
          <span className="font-bold">{to || formatAddress(props.to)}</span>
        </div>
        <div className="flex mt-3 gap-5">
          <Image width="70" height="70" src="/example-nft.png" alt="Token image" />
          <div>
            <div className="flex align-center">
              <span className="font-bold text-sm mr-3">{props.name}</span>
              <p>
                <Image width="16" height="16" src={props.networkIcon} alt="Mint event" />
              </p>
              <span className="ml-2 text-sm">
                {intlFormatDistance(props.time, new Date(), { locale: "en" })}
              </span>
            </div>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Activity: FC<ActivityProps> = (props) => {
  if (props.type === "Send") return SendActivity(props as SendActivityProps)
  if (props.type === "Mint") return MintActivity(props as MintActivityProps)

  throw new Error("Unknown Activity Type")
}
export default Activity
