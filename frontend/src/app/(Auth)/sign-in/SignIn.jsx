"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { toast } from "sonner";
import bloodDrop from "../../../../public/assets/bloodDrop.gif";
import logo from "../../../../public/assets/logo.png";
import facebook from "../../../../public/icons/facebookColor.svg";
import flag from "../../../../public/icons/flag.svg";
import google from "../../../../public/icons/google.svg";

const SignIn = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleValueChange = (key, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleConfirmLogin = () => {
    const { phoneNumber, password } = loginData;

    if (phoneNumber === "") {
      toast.warning("Please provide your phone number!");
      return;
    } else if (password === "") {
      toast.warning("Please provide your password!");
      return;
    } else {
      toast.success("Login successful!");
    }
  };

  return (
    <section>
      <div className="grid sm:grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ x: "100%", zIndex: 1 }}
          animate={{ x: 0, zIndex: 1 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <div className="flex justify-center items-center h-screen w-full sm:hidden md:block">
            <div className="h-screen flex justify-center items-center">
              <Image src={bloodDrop} alt="Blood Drop Image" width={400} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: "-50%", zIndex: 0 }}
          animate={{ x: 0, zIndex: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <div className="flex justify-start items-center h-screen">
            <div className="space-y-4 shadow-[0_0_100px_0px_rgba(240,66,66,0.15)] p-8 rounded-2xl bg-white dark:bg-zinc-950 border w-[460px] relative ">
              <Button
                onClick={() => router.push("/")}
                className="absolute border bg-transparent hover:bg-muted text-foreground p-3 rounded-lg shadow-none top-6 left-6 h-11"
              >
                <IoReturnUpBack className="text-xl" />
              </Button>

              <div className="flex justify-center">
                <Image src={logo} alt="Logo Image" width={120} />
              </div>
              <h3 className="text-primary text-center mb-6 font-semibold">
                Sign In
              </h3>

              <div>
                <div>
                  <Label className="text-xs text-zinc-400">Phone Number</Label>
                  <div className="flex">
                    <div className="flex border px-3 gap-1 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-background">
                      <Image
                        src={flag}
                        alt="flag bd icon"
                        width={22}
                        height={22}
                      />
                      <p className="mr-3 text-sm">+880</p>
                    </div>
                    <Input
                      className="rounded-tl-none rounded-bl-none border-l-0"
                      type="text"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      name="phoneNumber"
                      defaultValue={loginData.phoneNumber}
                      onChange={(e) => {
                        let phoneNumber = e.target.value.trim();

                        if (phoneNumber.startsWith("0")) {
                          phoneNumber = phoneNumber.substring(1);
                        }

                        if (!/^\d*$/.test(phoneNumber)) {
                          e.target.value = "";
                          toast.warning("Only numbers are allowed.");
                          return;
                        }

                        if (phoneNumber.length >= 11) {
                          e.target.value = "";
                          toast.warning(
                            "Phone number cannot be grater than 11."
                          );
                          return;
                        }

                        if (
                          phoneNumber.length === 0 ||
                          (phoneNumber.startsWith("1") &&
                            phoneNumber.length === 10)
                        ) {
                          handleValueChange("phoneNumber", phoneNumber);
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-zinc-400">Password</Label>
                  <div className="relative flex items-center">
                    <Input
                      type={!isShowPassword ? "password" : "text"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        handleValueChange("password", e.target.value)
                      }
                      required
                    />
                    <span
                      className="cursor-pointer absolute right-3"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <Button className="w-full text-base" onClick={handleConfirmLogin}>
                Sign In
              </Button>

              <div className="text-muted-foreground flex items-center gap-4 w-full">
                <div className="h-[2px] bg-muted w-1/2 rounded-full"></div>
                <p>or</p>
                <div className="h-[2px] bg-muted w-1/2 rounded-full"></div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  className="border w-full flex items-center gap-2 hover:bg-transparent font-normal h-10 rounded-lg"
                >
                  <Image src={google} alt="Google Icon" />
                  Google
                </Button>
                <Button
                  variant="ghost"
                  className="border w-full flex items-center gap-2 hover:bg-transparent font-normal h-10 rounded-lg"
                >
                  <Image src={facebook} alt="facebook Icon" />
                  FaceBook
                </Button>
              </div>

              <div className="text-sm flex gap-1 justify-center">
                <p>{"Don't have an account?"}</p>
                <Link href={"/sign-up"} className="text-primary font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignIn;
