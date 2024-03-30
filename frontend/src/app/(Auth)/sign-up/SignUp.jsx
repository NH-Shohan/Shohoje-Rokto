"use client";

import app from "@/app/firebaseConfig";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AuthContext } from "@/context/AuthContext";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { toast } from "sonner";
import bloodDrop from "../../../../public/assets/bloodDrop.gif";
import logo from "../../../../public/assets/logo.png";
import facebook from "../../../../public/icons/facebookColor.svg";
import flag from "../../../../public/icons/flag.svg";
import google from "../../../../public/icons/google.svg";
import OtpAlert from "../OtpAlert";
import TermsCondition from "../TermsCondition";

const SignUp = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth(app);

  const [open, setOpen] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOptSent, setIsOptSent] = useState(false);
  const [optConfirmationResult, setOptConfirmationResult] = useState(null);
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

    if (!isChecked) {
      toast.warning("Please accept the terms and conditions!");
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
        duration: 7000,
      });
    } else {
      toast.success("Registration successful!");
    }
  };

  // OPT Functionality
  useEffect(() => {
    if (auth) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {},
          "expired-callback": () => {},
        }
      );
    }
  }, [auth]);

  const handleSendOpt = async () => {
    try {
      setIsSendingOTP(true);

      const fullPhoneNumber = `+880${registration.phoneNumber}`;
      const confirmPhoneNumber = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        window.recaptchaVerifier
      );

      setOptConfirmationResult(confirmPhoneNumber);
      setIsOptSent(true);
      setOpen(true);
    } catch (error) {
      toast.error("Error: OTP sending failed!");
    } finally {
      setIsSendingOTP(false);
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

              <div className="text-foreground">
                <div>
                  <Label className="text-xs text-zinc-400">Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    defaultValue={registration.name}
                    onChange={(e) => {
                      let name = e.target.value.trim();
                      if (!/^[A-Za-z\s]*$/.test(name)) {
                        e.target.value = "";
                        toast.warning("Only letters are allowed.");
                        return;
                      } else {
                        handleValueChange("name", name);
                      }
                    }}
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
                <Checkbox
                  id="terms"
                  checked={isChecked}
                  onCheckedChange={() => setIsChecked(!isChecked)}
                />
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

              <div className="space-y-1">
                <AlertDialog open={open} onOpenChange={setOpen}>
                  {registration.password !== "" &&
                  registration.confirmPassword !== "" &&
                  passwordStrength === "strong" &&
                  registration.password === registration.confirmPassword &&
                  isChecked ? (
                    <Button
                      onClick={handleSendOpt}
                      className="w-full space-x-1"
                    >
                      {isSendingOTP ? (
                        <>
                          <LoadingSpinner className={"size-10 text-white"} />
                          <p>Sending OPT...</p>
                        </>
                      ) : (
                        <p>Sign Up</p>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handleConfirmRegistration}
                    >
                      Sign Up
                    </Button>
                  )}
                  <OtpAlert
                    registration={registration}
                    open={open}
                    setOpen={setOpen}
                    optConfirmationResult={optConfirmationResult}
                  />
                </AlertDialog>

                {!isOptSent ? (
                  <div
                    id="recaptcha-container"
                    className="flex justify-center"
                  ></div>
                ) : null}

                <div className="text-sm flex gap-1">
                  <p>Already have an account?</p>
                  <Link href={"/sign-in"} className="text-primary font-medium">
                    Sign In
                  </Link>
                </div>
              </div>

              <div className="text-muted-foreground flex items-center w-full">
                <div className="h-[2px] bg-muted w-full rounded-full"></div>
                <p className="uppercase text-xs w-full text-center">
                  or continue with
                </p>
                <div className="h-[2px] bg-muted w-full rounded-full"></div>
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
              <Image
                src={bloodDrop}
                alt="Blood Drop Image"
                width={400}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;
