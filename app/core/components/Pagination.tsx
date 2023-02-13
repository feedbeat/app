import { FC, MouseEventHandler } from "react"
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5"

type PaginationProps = {
  rangeStart: number
  rangeEnd: number
  end: number
  onGo: (to: number) => void
  current: number
  className?: string
}

function getClassName(num: number, active: number) {
  if (active === num)
    return "text-white border-b-2 border-[#0072FF] text-medium pb-[0.625rem] pt-1 mr-8"
  else return "text-white opacity-40 text-medium pb-[0.625rem] pt-1 mr-8"
}

const Pagination: FC<PaginationProps> = (props) => {
  const getClickHandler =
    (page: number): MouseEventHandler<HTMLAnchorElement> =>
    (evt) => {
      evt.preventDefault()
      props.onGo(page)
    }
  return (
    <div className={props.className}>
      {props.current > 1 ? (
        <a
          className="text-medium pb-[0.625rem] pt-1 mr-12 text-[#0072FF]"
          href={`?page=${props.current - 1}`}
          onClick={getClickHandler(props.current - 1)}
        >
          <IoChevronBackSharp className="inline" />
        </a>
      ) : null}
      {Array.from({ length: props.rangeEnd - props.rangeStart + 1 }, (_, i) => {
        const page = i + props.rangeStart
        return (
          <a
            className={getClassName(page, props.current)}
            key={`page-${page}`}
            href={`?page=${page}`}
            onClick={getClickHandler(page)}
          >
            {page}
          </a>
        )
      })}
      {props.current < props.end ? (
        <a
          className="text-medium pb-[0.625rem] pt-1 ml-12 text-[#0072FF]"
          href={`?page=${props.current - 1}`}
          onClick={getClickHandler(props.current + 1)}
        >
          <IoChevronForwardSharp className="inline" />
        </a>
      ) : null}
    </div>
  )
}

export default Pagination
