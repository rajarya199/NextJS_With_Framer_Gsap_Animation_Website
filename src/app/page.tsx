import AboutUs from "@/components/AboutUs";
import Hero from "@/components/Hero";
import RecentWorkSection from "@/components/RecentWorkSection";
import StatsCards from "@/components/StatCards";
import WorkDisplay from "@/components/WorkDisplay";

export default function Home() {
  return (
  <main>
<Hero/>
<RecentWorkSection/>
<WorkDisplay/>
<AboutUs/>
<StatsCards/>
  </main>
  );
}
