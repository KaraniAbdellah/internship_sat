import Header from "../features/Home/components/Header";
import Hero from "../features/Home/components/Hero";
import Agents from "../features/Home/components/Agents";
import Section from "../features/Home/components/Section";
import FAQ from "../features/Home/components/FAQ";
import Footer from "../features/Home/components/Footer";
import Pricing from "../features/Home/components/Pricing";
const HomePage = () => {
  return (
    <div className="w-100%">
      <Header />
      <Hero />
      <Agents />
      <Section />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
