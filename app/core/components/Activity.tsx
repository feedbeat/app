import formatAddress from "@/app/utils/format-address"
import Image from "next/image"
import { FC } from "react"

type ActivityProps = {
  avatar: string
  name: string
  address: string
  event: Event
}

type Event = MintEvent

type MintEvent = {
  type: "Mint"
  name: string
  image: string
  networkIcon: string
  description: string
}

const Activity: FC<ActivityProps> = (props) => {
  return (
    <div className="rounded-xl border-white p-3 border flex gap-x-2">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <Image width="56" height="56" src={props.avatar} alt="Avatar" />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold mr-1">{props.name}</span>
          <span className="text-sm text-[#828282] mr-5">{formatAddress(props.address)}</span>
          <Image width="38" height="19" src="/events/mint-event.svg" alt="Mint event" />
          <span className="ml-2">Minted an NFT</span>
        </div>
        <div className="flex mt-3 gap-5">
          <Image width="70" height="70" src="/example-nft.png" alt="Token image" />
          <div>
            <div>
              <span className="font-bold mr-3">{props.event.name}</span>
              <Image width="16" height="16" src={props.event.networkIcon} alt="Mint event" />
              <span className="ml-2">Minted an NFT</span>
            </div>
            <p>{props.event.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
