import Auth from "../components/AuthPage";

const LoginPage = ({ theme, onLoginSuccess }) => {
  return <Auth mode="login" theme={theme} onLoginSuccess={onLoginSuccess} />;
};

export default LoginPage;