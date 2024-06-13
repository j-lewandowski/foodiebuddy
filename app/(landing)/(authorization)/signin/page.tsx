import { getProviders } from "next-auth/react";
import AuthContainer from "../_components/AuthContainer";
import SignInButton from "../_components/SignInButton";

const SignInPage = async () => {
  let providers = await getProviders();

  console.log(providers);

  return (
    <AuthContainer>
      {providers &&
        Object.keys(providers).map((provider) => {
          const p = providers[provider];
          return <SignInButton key={p.name} id={p.id} provider={p.name} />;
        })}
    </AuthContainer>
  );
};

export default SignInPage;
