import AuthContainer from "../_components/AuthContainer";
import SignInButton from "../_components/SignInButton";
import { getProviders } from "next-auth/react";

const SignUpPage = async () => {
  let providers = await getProviders();

  return (
    <AuthContainer variant="sign-up">
      {providers &&
        Object.keys(providers).map((provider) => {
          const p = providers[provider];
          return <SignInButton key={p.name} id={p.id} provider={p.name} />;
        })}
    </AuthContainer>
  );
};

export default SignUpPage;
