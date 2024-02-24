import ContainerScroll from "@/components/ui/ContainerScroll";
import Footer from "@/components/ui/footer";
import BloodType from "./(home)/BloodType";
import Criteria from "./(home)/Criteria";
import DonationProcess from "./(home)/DonationProcess";
import Hero from "./(home)/Hero";
import MovingCards from "./(home)/MovingCards";

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
