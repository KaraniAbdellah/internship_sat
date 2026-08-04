import Header from "../features/Home/components/Header";
import Hero from "../features/Home/components/Hero";
import Solution from "../features/Home/components/Solution";
import Section from "../features/Home/components/Section";
import FAQ from "../features/Home/components/FAQ";
import Footer from "../features/Home/components/Footer";

const HomePage = () => {
  return (
    <div className="w-100%">
      <Header />
      <Hero />
      <Solution />
      <Section />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
