import { Separator } from "@/components/ui/separator";

const DonationEvents = () => {
  return (
    <div>
      <h3 className="text-foreground">Blood Donation Events</h3>
      <p>Offline events where you can save lifes</p>

      <Separator className="my-5" />

      <div className="h-[40vh] w-full flex flex-col justify-center items-center text-center gap-4">
        <p className="text-2xl">No Events Right Now</p>
        <p className="text-7xl text-primary">Comming Soon</p>
      </div>
    </div>
  );
};

export default DonationEvents;
