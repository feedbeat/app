import { FC } from "react"

const Navbar: FC = () => {
  return (
    <nav className="bg-[#171717] w-full fixed top-0">
      <div className="mx-auto px-6 py-4 flex justify-between">
        <span className="text-white font-extrabold text-3xl">feadbeats</span>
        <button className="h-9 w-36 rounded-full text-white border-white border font-light">
          Sign up
        </button>
      </div>
    </nav>
  )
}

export default Navbar
