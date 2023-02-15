import { FC, MouseEventHandler } from "react"
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5"

type PaginationProps = {
  onPrev: () => void
  onNext: () => void
  prev: boolean
  next: boolean
  className?: string
}

const Pagination: FC<PaginationProps> = (props) => {
  return (
    <div className={props.className}>
      <button
        className={[
          "text-medium pb-[0.625rem] pt-1 mr-12",
          props.prev ? "text-[#0072FF]" : "text-white opacity-40 cursor-not-allowed",
        ].join(" ")}
        onClick={props.onPrev}
      >
        <IoChevronBackSharp className="inline" />
      </button>
      <button
        className={[
          "text-medium pb-[0.625rem] pt-1 mr-12",
          props.next ? "text-[#0072FF]" : "text-white opacity-40 cursor-not-allowed",
        ].join(" ")}
        onClick={props.onNext}
      >
        <IoChevronForwardSharp className="inline" />
      </button>
    </div>
  )
}

export default Pagination
