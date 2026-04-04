import { api } from "./api";
import { AuthData, ApiResponse } from "../types";

export const authService = {
  /**
   * Authenticates a user via Google ID token and returns an application JWT.
   */
  authenticateWithGoogle: async (googleIdToken: string): Promise<AuthData> => {
    const response = await api.post<ApiResponse<AuthData>>("/auth/google", {
      google_id_token: googleIdToken,
    });
    return response.data.data;
  },
};
