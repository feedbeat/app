import { FC } from "react"
import Image from "next/image"
import { TfiClose } from "react-icons/tfi"

type AccountProps = {
  icon: string
  alt: string
  text: string
  onRemove: () => void
}

const Account: FC<AccountProps> = ({ icon, text, alt, onRemove }) => {
  return (
    <div className="inline-block rounded-xl bg-[#242221] px-[1rem] py-3.5 flex text-white">
      <div className="rounded-full flex items-center bg-[#151413] h-8 px-3 gap-x-2 w-[10.5rem]">
        <Image src={icon} width="18" height="18" alt={alt} />
        <span>{text}</span>
      </div>
      <button className="bg-transparent rounded-none text-lg ml-3" onClick={onRemove}>
        <TfiClose />
      </button>
    </div>
  )
}

export default Account
