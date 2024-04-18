const details = [
  {
    title: "Accessibility When Needed",
    description:
      "We understand that emergencies don't wait, which is why we're here to provide blood when you need it the most. Our network ensures that accessible blood supply is available, so you never have to face critical situations alone.",
  },
  {
    title: "Streamlined Donation Process",
    description:
      "We offer a simplified and efficient donation process when needed, making it easy for donors to contribute and for recipients to receive the blood they need.",
  },
  {
    title: "Donor Support",
    description:
      "Our commitment doesn't end with the donation. We maintain a strong connection with our blood donors and offer support to recipients throughout their journey. We understand the importance of a caring community, and we're here to ensure you receive the assistance you require.",
  },
  {
    title: "Donor Rewards",
    description:
      "We appreciate the selflessness of our blood donors. As a token of our gratitude, we offer a donor recognition program that acknowledges and rewards our regular donors. Your contributions not only save lives but also earn you special recognition and benefits within our community.",
  },
  {
    title: "Community Engagement",
    description:
      "Together, we make a difference. Our platform serves as a hub where blood donors and recipients come together as a united community. We encourage compassion, care, and empathy.",
  },
];

const WhyDetails = () => {
  return (
    <div className="[clip-path:polygon(0%_25%,100%_0%,100%_75%,0%_100%)] bg-primary">
      <div className="container text-zinc-200 grid grid-cols-3 gap-16 py-80">
        <p className="text-5xl font-medium text-white h-full flex items-center">
          Why <br /> Shohoje Rokto?
        </p>
        {details.map((item, index) => (
          <div key={index} className="space-y-3">
            <p className="border border-white w-14 h-14 grid place-items-center rounded-lg text-2xl">
              0{index + 1}
            </p>
            <p className="text-white font-medium text-2xl">{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyDetails;
