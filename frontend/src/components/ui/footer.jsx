import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="mt-32 relative">
      <div className="grid grid-cols-7 container mb-10">
        <div className="col-span-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-primary">Get In Touch</h2>
            <p className="w-2/3">
              {
                "We're here to assist you. If you have any questions, need assistance, or would like to learn more about our blood donation community, please don't hesitate to reach out. Your feedback and inquiries are important to us, and we're committed to providing the information and support you need."
              }
            </p>
            <div className="lowercase flex gap-14">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/mail.svg"}
                  alt="Mail Icon"
                  width={20}
                  height={20}
                  priority
                />
                <p>shohojerokto@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/facebook.svg"}
                  alt="FaceBook Icon"
                  width={20}
                  height={20}
                  priority
                />
                <p>WWW.FACEBOOK.COM/SHOHOJEROKTO</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-7 gap-20">
            <div className="col-span-4">
              <Link href={"/"} className="w-fit bg-light">
                <Image
                  src={"/assets/logo.png"}
                  alt="Logo"
                  width={200}
                  height={100}
                  priority
                />
              </Link>
              <p className="text-justify mt-5">
                {
                  "Thank you for being a part of our life-saving mission. Your support and participation help save lives every day. If you have any questions, need assistance, or want to get involved, please don't hesitate to get in touch with us. Together, we can make a meaningful difference in our community and beyond."
                }
              </p>
            </div>

            <div className="flex flex-col gap-2 text-left col-span-2 text-foreground font-light">
              <h3 className="text-primary">Pages</h3>
              <Link
                className="hover:font-normal hover:text-primary w-fit transition-all"
                href={"about"}
              >
                <p>About Us</p>
              </Link>
              <Link
                className="hover:font-normal hover:text-primary w-fit transition-all"
                href={"donor-search"}
              >
                Donor Search
              </Link>
              <Link
                className="hover:font-normal hover:text-primary w-fit transition-all"
                href={"be-donor"}
              >
                Be Donor
              </Link>
              <Link
                className="hover:font-normal hover:text-primary w-fit transition-all"
                href={"requested-post"}
              >
                Requested Post
              </Link>
              <Link
                className="hover:font-normal hover:text-primary w-fit transition-all"
                href={"request-blood"}
              >
                Request Blood
              </Link>
              <Link
                className="hover:font-normal hover:text-primary w-fit transition-all"
                href={"privacy-policy"}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-2 border border-primary rounded-xl p-10 shadow-3xl col-span-3 bg-white dark:bg-black">
          <h3 className="text-primary">Support 🩸 Inquiries 🩸 Suggestions</h3>

          <div className="w-full">
            <Label className="text-xs" htmlFor="name">
              Name
            </Label>
            <Input type="name" id="name" placeholder="Enter Your Name" />
          </div>

          <div className="w-full">
            <Label className="text-xs" htmlFor="email">
              Email
            </Label>
            <Input type="email" id="email" placeholder="Enter Your Email" />
          </div>

          <div className="w-full">
            <Label className="text-xs" htmlFor="message">
              Your message
            </Label>
            <Textarea
              placeholder="Enter Your Message or Suggestions"
              id="message"
              className="h-60"
            />
          </div>

          <Button variant="outline" className="w-1/3">
            Submit
          </Button>
        </div>
      </div>

      <div className="bg-light h-[63%] w-full absolute bottom-0 -z-50"></div>

      <div className="bg-primary dark:bg-background dark:text-primary h-16 flex justify-center items-center">
        <p className="text-light dark:text-primary">
          <span className="text-white dark:text-primary dark:font-medium">
            Copyright ©️ {year}
          </span>{" "}
          <span>Shohoje Rokto. All right reserved | </span>
          <span className="text-white dark:text-primary dark:font-medium">
            <Link href={"https://github.com/nh-shohan"} target="_blank">
              Nahim Hossain Shohan
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
