import ContainerScroll from "@/components/ui/ContainerScroll";
import Footer from "@/components/ui/footer";
import BloodType from "./(Home)/BloodType";
import Criteria from "./(Home)/Criteria";
import DonationProcess from "./(Home)/DonationProcess";
import Hero from "./(Home)/Hero";
import MovingCards from "./(Home)/MovingCards";

export default function Home() {
  return (
    <main>
      <section className="container">
        <Hero />
        <div className="my-10"></div>
        <Criteria />
        <ContainerScroll />
        <BloodType />
        <div className="my-14"></div>
        <DonationProcess />
        <MovingCards direction={"right"} />
        <MovingCards direction={"left"} />
      </section>
      <Footer />
    </main>
  );
}
