import AuthContainer from "../_components/AuthContainer";
import SignInButton from "../_components/SignInButton";

const SignInPage = async () => {
  let providers = [];
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/providers",
      { cache: "no-store" }
    );
    providers = await res.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <AuthContainer>
      {Object.keys(providers).map((provider) => {
        const p = providers[provider];
        return <SignInButton key={p.name} id={p.id} provider={p.name} />;
      })}
    </AuthContainer>
  );
};

export default SignInPage;
