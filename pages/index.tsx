import useUser from "@/app/core/hooks/useUser"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { useRouter } from "next/router"

const Home: BlitzPage = () => {
  const { startLogin, isLoggedIn } = useUser()
  const router = useRouter()
  return (
    <Layout>
      <div
        className="h-full bg-cover bg-bottom grid place-items-center text-white text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(49, 49, 49, 0.72), rgba(49, 49, 49, 0.72)), url(/landing-bg.jpg)`,
        }}
      >
        <div>
          <p className="font-extrabold text-[4rem] leading-[4.75rem]">Web3 Feed For All Gamers</p>
          <p className="text-4xl font-light mb-6">See what games alpha users play</p>
          <button
            className="rounded-full w-[16.5rem] h-[4rem] bg-[#FF2E00] font-extrabold text-2xl"
            onClick={() => {
              if (isLoggedIn) router.push("/feed").catch(console.error)
              else startLogin()
            }}
          >
            Start feedbeats
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
