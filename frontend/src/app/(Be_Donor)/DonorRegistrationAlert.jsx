import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useEffect, useState } from "react";

const DonorRegistrationAlert = ({ donorRegistration }) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

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
      setMinutes(1);
      setSeconds(59);
    }

    return () => clearInterval(timerInterval);
  }, [minutes, seconds, open]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setOpen(false);
    }
  }, [minutes, seconds]);

  return (
    <AlertDialogContent>
      <AlertDialogHeader className={"space-y-4"}>
        <AlertDialogTitle className="text-center text-foreground">
          Enter OTP Code
        </AlertDialogTitle>

        <AlertDialogDescription className="text-center">
          No worries! We sent you SMS with 6 digit <br /> verification code
          (OTP) on
        </AlertDialogDescription>

        <p className="text-center font-medium text-foreground">
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

        <div className="mx-auto space-y-2">
          <div className="flex gap-1 justify-center text-foreground">
            <p>Enter the code you have in </p>
            <p className="text-primary">{`${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
            <p>min</p>
          </div>

          <div className="flex gap-1 justify-center">
            <p>{"Didn't receive the code? "}</p>
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
  );
};

export default DonorRegistrationAlert;
