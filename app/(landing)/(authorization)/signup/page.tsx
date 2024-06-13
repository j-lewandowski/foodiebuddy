import { getProviders } from "next-auth/react";
import AuthContainer from "../_components/AuthContainer";
import SignInButton from "../_components/SignInButton";

const SignUpPage = async () => {
  // @TO-DO - Implement the getProviders function cause nextauths sucks

  return (
    <AuthContainer variant="sign-up">
      <SignInButton key={"Google"} id={"google"} provider={"Google"} />
    </AuthContainer>
  );
};

export default SignUpPage;
