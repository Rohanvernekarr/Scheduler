import { Hero } from "@/components/sections/Hero"
import { MessageBox } from "@/components/sections/MessageBox"


export default function Home() {
  return (
    <div className="space-y-8">
     
      <Hero />
      <div className="container max-w-2xl mx-auto px-4 mb-10">
        <MessageBox />
      </div>
    </div>
  )
}
