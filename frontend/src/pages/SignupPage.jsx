import Auth from "../components/AuthPage";

const SignupPage = ({ theme, onLoginSuccess }) => {
  return <Auth mode="signup" theme={theme} onLoginSuccess={onLoginSuccess} />;
};

export default SignupPage;
