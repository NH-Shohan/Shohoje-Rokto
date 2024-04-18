import { AuthProvider } from "@/context/AuthContext";
import SignUp from "./SignUp";

const SignUpPage = () => {
  return (
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
};

export default SignUpPage;
