import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, token, setUser, setToken, logout } = useUserStore();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      // Mock data for demo
      const data = {
        user: {
          id: "user_123",
          email: "harry@example.com",
          full_name: "Harry",
        },
        token: "mock_jwt_token"
      };
      
      setUser(data.user);
      setToken(data.token);
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      // For mock purposes, let's just navigate to dashboard if login fails
      // This is just to make the app runnable for the user
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    loginWithGoogle,
    logout: handleLogout,
  };
};
