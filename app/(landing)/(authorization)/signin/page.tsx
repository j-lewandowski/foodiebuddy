import AuthContainer from "../_components/AuthContainer";
import SignInButton from "../_components/SignInButton";

const SignInPage = async () => {
  // @TO-DO - Implement the getProviders function cause nextauths sucks

  return (
    <AuthContainer>
      <SignInButton key={"Google"} id={"google"} provider={"Google"} />
    </AuthContainer>
  );
};

export default SignInPage;
