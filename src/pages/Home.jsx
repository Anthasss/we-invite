import Hero from "../components/homeComponents/heroComponents/Hero";
import Catalogue from "../components/homeComponents/catalogueComponents/Catalogue";
import FrequentlyAskedQuestion from "../components/homeComponents/FrequentlyAskedQuestion";
import FeaturesList from "../components/homeComponents/featuresListComponents/FeaturesList";

export default function Home() {
  return (
    <div>
      <Hero />
      <Catalogue />
      <FeaturesList />
      <FrequentlyAskedQuestion />
    </div>
  );
}