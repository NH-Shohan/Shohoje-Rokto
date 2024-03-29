"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { toast } from "sonner";
import bloodDrop from "../../../../public/assets/bloodDrop.gif";
import logo from "../../../../public/assets/logo.png";
import facebook from "../../../../public/icons/facebookColor.svg";
import flag from "../../../../public/icons/flag.svg";
import google from "../../../../public/icons/google.svg";
import TermsCondition from "../TermsCondition";

const SignUp = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [registration, setRegistration] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [criteriaMet, setCriteriaMet] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    specialCharacter: false,
    minLength: false,
  });
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (open) {
      timerInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setMinutes(4);
      setSeconds(59);
    }

    return () => clearInterval(timerInterval);
  }, [minutes, seconds, open]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setOpen(false);
    }
  }, [minutes, seconds]);

  const handleValueChange = (key, value) => {
    setRegistration((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (key === "password" || key === "confirmPassword") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
      setCriteriaMet(checkCriteria(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) {
      return "weak";
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password);
    const hasNumber = /\d/.test(password);

    if (hasLowercase && hasUppercase && hasSpecialCharacter && hasNumber) {
      return "strong";
    } else if (
      (hasLowercase && hasUppercase) ||
      (hasLowercase && hasSpecialCharacter) ||
      (hasLowercase && hasNumber) ||
      (hasUppercase && hasSpecialCharacter) ||
      (hasUppercase && hasNumber) ||
      (hasSpecialCharacter && hasNumber)
    ) {
      return "medium";
    } else {
      return "weak";
    }
  };

  const checkCriteria = (password) => {
    const minLength = password.length >= 6;
    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    const specialCharacter = /[!@#$%^&*]/.test(password);

    return {
      lowercase,
      uppercase,
      number,
      specialCharacter,
      minLength,
    };
  };

  const handleConfirmRegistration = () => {
    const { name, phoneNumber, password, confirmPassword } = registration;

    if (name === "") {
      toast.warning("Please provide your full name!");
      return;
    } else if (phoneNumber === "") {
      toast.warning("Please provide your phone number!");
      return;
    } else if (password === "") {
      toast.warning("Please provide your password!");
      return;
    } else if (confirmPassword === "") {
      toast.warning("Please provide your password to confirm password!");
      return;
    } else if (passwordStrength === "weak") {
      toast.warning("Password is too weak!");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    if (passwordStrength === "medium") {
      let suggestion =
        "Consider using a stronger password for better security. Password must contain at least ";

      if (!/[a-z]/.test(password)) {
        suggestion += "\none lowercase letter";
      }
      if (!/[A-Z]/.test(password)) {
        suggestion += "\none uppercase letter";
      }
      if (!/[!@#$%^&*]/.test(password)) {
        suggestion += "\none special character";
      }
      if (!/\d/.test(password)) {
        suggestion += "\none number";
      }

      toast.info(suggestion, {
        duration: 8000,
      });
    } else {
      toast.success("Registration successful!");
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="grid sm:grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ x: "50%" }}
          animate={{ x: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <div className="flex justify-end items-center h-screen">
            <div className="space-y-4 shadow-[0_0_100px_0px_rgba(240,66,66,0.15)] p-8 rounded-2xl bg-white dark:bg-zinc-950 border w-[460px] relative">
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
                Sign Up
              </h3>

              <div>
                <div>
                  <Label className="text-xs text-zinc-400">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={registration.name}
                    onChange={(e) => handleValueChange("name", e.target.value)}
                    required
                  />
                </div>

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
                      defaultValue={registration.phoneNumber}
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
                      value={registration.password}
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

                <div>
                  <Label className="text-xs text-zinc-400">
                    Confirm Password
                  </Label>
                  <div className="relative flex items-center">
                    <Input
                      type={!isShowConfirmPassword ? "password" : "text"}
                      placeholder="Confirm Password"
                      value={registration.confirmPassword}
                      onChange={(e) =>
                        handleValueChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                    <span
                      className="cursor-pointer absolute right-3"
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                    >
                      {isShowConfirmPassword ? (
                        <EyeOpenIcon />
                      ) : (
                        <EyeClosedIcon />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <Checkbox id="terms" />
                <div>
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept{" "}
                  </label>
                  <Drawer>
                    <DrawerTrigger>
                      <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
                        terms and conditions
                      </span>
                    </DrawerTrigger>
                    <TermsCondition />
                  </Drawer>
                </div>
              </div>

              <div className="flex flex-col gap-[3px] justify-center w-full">
                <div
                  className={`relative w-full h-[3px] ${
                    registration.password === ""
                      ? "bg-white dark:bg-neutral-950"
                      : ""
                  } bg-gray-300 rounded-full overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 h-full transition-all ${
                      passwordStrength === "weak"
                        ? "bg-red-600"
                        : passwordStrength === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                    style={{
                      width: `${
                        (Object.values(criteriaMet).filter(Boolean).length /
                          5) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                {registration.password && (
                  <span className="text-xs font-medium">
                    {((Object.values(criteriaMet).filter(Boolean).length / 5) *
                      100 <=
                      20 && <span className="text-red-700">Too Weak</span>) ||
                      ((Object.values(criteriaMet).filter(Boolean).length / 5) *
                        100 <=
                        40 && <span className="text-primary">Weak</span>) ||
                      ((Object.values(criteriaMet).filter(Boolean).length / 5) *
                        100 <=
                        80 && (
                        <span className="text-yellow-500">Medium</span>
                      )) ||
                      ((Object.values(criteriaMet).filter(Boolean).length / 5) *
                        100 ===
                        100 && <span className="text-green-600">Strong</span>)}
                  </span>
                )}
              </div>

              <AlertDialog open={open} onOpenChange={setOpen}>
                {registration.password !== "" &&
                registration.confirmPassword !== "" &&
                passwordStrength === "strong" &&
                registration.password === registration.confirmPassword ? (
                  <AlertDialogTrigger className="w-full">
                    <p className="w-full bg-primary text-primary-foreground shadow hover:bg-[#f02030] h-9 flex items-center justify-center rounded-md font-medium">
                      Sign Up
                    </p>
                  </AlertDialogTrigger>
                ) : (
                  <Button
                    className="w-full text-base"
                    onClick={handleConfirmRegistration}
                  >
                    Sign Up
                  </Button>
                )}

                <AlertDialogContent>
                  <AlertDialogHeader className={"space-y-4"}>
                    <AlertDialogTitle className="text-center">
                      Enter OTP Code
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center">
                      No worries! We sent you SMS with 6 digit <br />{" "}
                      verification code (OTP) on
                    </AlertDialogDescription>

                    <p className="text-center font-medium">
                      +880{registration.phoneNumber}
                    </p>

                    <InputOTP
                      className="mx-auto"
                      maxLength={6}
                      render={({ slots }) => (
                        <>
                          <InputOTPGroup>
                            {slots.slice(0, 3).map((slot, index) => (
                              <InputOTPSlot key={index} {...slot} />
                            ))}{" "}
                          </InputOTPGroup>

                          <InputOTPGroup>
                            {slots.slice(3).map((slot, index) => (
                              <InputOTPSlot key={index + 3} {...slot} />
                            ))}
                          </InputOTPGroup>
                        </>
                      )}
                    />

                    <Button className="w-1/2 mx-auto">Confirm Code</Button>

                    <div className="mx-auto">
                      <div className="flex gap-1 justify-center my-4">
                        <p>Enter the code you have in </p>
                        <p className="text-primary">{`${minutes
                          .toString()
                          .padStart(2, "0")}:${seconds
                          .toString()
                          .padStart(2, "0")}`}</p>
                        <p>min</p>
                      </div>

                      <div className="flex gap-1 justify-center">
                        <p>{"Didn't receive the email? "}</p>
                        <Link
                          href="#"
                          className="text-green-600 hover:text-green-700 hover:underline"
                        >
                          Resend
                        </Link>
                      </div>
                    </div>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>

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
                <p>Already have an account?</p>
                <Link href={"/sign-in"} className="text-primary font-medium">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <div className="flex justify-center items-center h-screen w-full sm:hidden md:block">
            <div className="h-screen flex justify-center items-center">
              <Image src={bloodDrop} alt="Blood Drop Image" width={400} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;
