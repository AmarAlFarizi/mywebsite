import Hero from "@/components/Hero";
import HorizontalScrollProjects from "@/components/HorizontalScrollProjects";
import Ecosystem from "@/components/Ecosystem";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <>
      <Hero />
      <ProfileCard />
      <HorizontalScrollProjects />
      <Ecosystem />
    </>
  );
}
