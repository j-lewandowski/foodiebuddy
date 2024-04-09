import AuthContainer from "../_components/AuthContainer";
import SignInButton from "../_components/SignInButton";

const SignUpPage = async () => {
  const res = await fetch("http://localhost:3000/api/auth/providers");
  const providers = await res.json();

  return (
    <AuthContainer variant="sign-up">
      {Object.keys(providers).map((provider) => {
        const p = providers[provider];
        return <SignInButton key={p.name} id={p.id} provider={p.name} />;
      })}
    </AuthContainer>
  );
};

export default SignUpPage;
