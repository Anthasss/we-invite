import Hero from "../components/homeComponents/heroComponents/Hero";
import Catalogue from "../components/homeComponents/catalogueComponents/Catalogue";
import FrequentlyAskedQuestion from "../components/homeComponents/FrequentlyAskedQuestion";

export default function Home() {
  return (
    <div>
      <Hero />
      <Catalogue />
      <FrequentlyAskedQuestion />
    </div>
  );
}