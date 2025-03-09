import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Models } from "../components/Models";
import { Datasets } from "../components/Datasets";
import { Community } from "../components/Community";
export function HomePage() {
  return <div className="min-h-screen bg-white">
    <Hero />
    <Features />
    <Models />
    <Datasets />
    <Community />
  </div>;
}