import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import flag from "../../../public/icons/flag.svg";

const DonorRegistration = ({ isComplete, currentStep, handlePrev }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [donorRegistration, setDonorRegistration] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("weak");
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
    const donorData = localStorage.getItem("donorData");
    if (donorData) {
      const { name, phoneNumber } = JSON.parse(donorData);
      setDonorRegistration((prevData) => ({
        ...prevData,
        name: name || "",
        phoneNumber: phoneNumber || "",
      }));
    }
  }, []);

  const handleValueChange = (key, value) => {
    setDonorRegistration((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
    setCriteriaMet(checkCriteria(value));
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
    const { password, confirmPassword } = donorRegistration;

    if (password === "") {
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
    <div className="w-3/5 mx-auto">
      <div className="space-y-4 border p-8 rounded-lg bg-light dark:bg-neutral-950">
        <h3 className="text-primary">Register As Donor</h3>

        <Input
          type="text"
          placeholder="Full Name"
          value={donorRegistration.name}
          onChange={(e) => handleValueChange("name", e.target.value)}
          required
        />

        <div className="flex">
          <div className="flex border px-3 gap-1 rounded-tl-md rounded-bl-md items-center bg-white dark:bg-background">
            <Image src={flag} alt="flag bd icon" width={22} height={22} />
            <p className="mr-3 text-sm">+880</p>
          </div>
          <Input
            className="rounded-tl-none rounded-bl-none border-l-0"
            type="text"
            placeholder="Phone Number"
            defaultValue={donorRegistration.phoneNumber}
            onChange={(e) => handleValueChange("phoneNumber", e.target.value)}
            required
          />
        </div>

        <div className="relative flex items-center">
          <Input
            type={!isShowPassword ? "password" : "text"}
            placeholder="Password"
            value={donorRegistration.password}
            onChange={(e) => handleValueChange("password", e.target.value)}
            required
          />
          <span
            className="cursor-pointer absolute right-3"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </span>
        </div>

        <div className="relative flex items-center">
          <Input
            type={!isShowConfirmPassword ? "password" : "text"}
            placeholder="Confirm Password"
            value={donorRegistration.confirmPassword}
            onChange={(e) =>
              handleValueChange("confirmPassword", e.target.value)
            }
            required
          />
          <span
            className="cursor-pointer absolute right-3"
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {isShowConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </span>
        </div>

        <div className="flex flex-col gap-[3px] justify-center w-full">
          <div
            className={`relative w-full h-[3px] ${
              donorRegistration.password === ""
                ? "bg-light dark:bg-neutral-950"
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
                  (Object.values(criteriaMet).filter(Boolean).length / 5) * 100
                }%`,
              }}
            ></div>
          </div>
          {donorRegistration.password && (
            <span className="text-xs font-medium">
              {((Object.values(criteriaMet).filter(Boolean).length / 5) * 100 <=
                20 && <span className="text-red-700">Too Weak</span>) ||
                ((Object.values(criteriaMet).filter(Boolean).length / 5) *
                  100 <=
                  40 && <span className="text-primary">Weak</span>) ||
                ((Object.values(criteriaMet).filter(Boolean).length / 5) *
                  100 <=
                  80 && <span className="text-yellow-500">Medium</span>) ||
                ((Object.values(criteriaMet).filter(Boolean).length / 5) *
                  100 ===
                  100 && <span className="text-green-600">Strong</span>)}
            </span>
          )}
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          {donorRegistration.password !== "" &&
          donorRegistration.confirmPassword !== "" &&
          passwordStrength === "strong" &&
          donorRegistration.password === donorRegistration.confirmPassword ? (
            <AlertDialogTrigger className="w-full">
              <Button className="w-full">Confirm Registration</Button>
            </AlertDialogTrigger>
          ) : (
            <Button className="w-full" onClick={handleConfirmRegistration}>
              Confirm Registration
            </Button>
          )}

          <AlertDialogContent>
            <AlertDialogHeader className={"space-y-4"}>
              <AlertDialogTitle className="text-center">
                Enter OTP Code
              </AlertDialogTitle>

              <AlertDialogDescription className="text-center">
                No worries! We sent you SMS with 6 digit <br /> verification
                code (OTP) on
              </AlertDialogDescription>

              <p className="text-center font-medium">
                +880{donorRegistration.phoneNumber}
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
                <div className="flex gap-1 justify-center">
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

            <Cross2Icon
              onClick={() => setOpen(!open)}
              className="h-5 w-5 top-4 right-4 absolute cursor-pointer"
            />
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex gap-4 mt-5">
        {!isComplete && (
          <>
            {currentStep !== 1 && (
              <Button variant="outline" onClick={handlePrev} className="w-2/5">
                Previous
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonorRegistration;
