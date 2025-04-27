// lib/api/auth.ts

// Align with User type defined in contexts/auth-context.tsx
interface User {
  id: string;
  name: string; // Combined name field
  email: string;
  avatar: string;
  role: string;
  verified: boolean;
  // Remove firstName/lastName if 'name' is used in context
}

// TODO: Define more specific types for API responses if needed
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string; // Add optional message field
  token?: string; // Assuming JWT token is returned on login/signup
}

// Mock function to simulate API delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get base URL and mock flag from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

/**
 * Login User function (Triggers OTP Send)
 * In a real app, this would send credentials to POST /api/login
 */
export const loginUser = async (email?: string | null, password?: string): Promise<ApiResponse<{ email: string | null | undefined }>> => {
  console.log(`Attempting login (to trigger OTP) for ${email}`);
  // await simulateDelay(1000);

  if (useMockApi) {
    // --- Mock Logic ---
    console.log("Mock API: Simulating login flow...");
    // The real backend sends OTP, not user data/token here.
    if (email === 'test@example.com' && password === 'password') { // Added mock password check
      console.log("Mock API: Credentials valid, simulating OTP send for test@example.com");
      return {
        success: true,
        data: { email }, // Return email to confirm which user OTP was sent for
        message: 'OTP sent Successfully (mock response)'
      };
    } else {
      console.log("Mock API: Invalid credentials");
      return {
        success: false,
        error: 'Invalid credentials (mock response)'
      };
    }
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    if (!API_BASE_URL) {
      console.error("API_BASE_URL is not defined in environment variables.");
      return { success: false, error: 'API endpoint configuration error.' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, { // Example endpoint path
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login API Error:", errorData);
      return { success: false, error: errorData.message || 'Login failed' };
    }

    const result = await response.json();
    // Assuming backend sends { success: true, message: 'OTP sent', data: { email } }
    return { success: true, data: result.data, message: result.message };

  } catch (error) {
    console.error("Network/Fetch Error during login:", error);
      return { success: false, error: 'Network error during login' };
    }
    // --- End Real API Logic ---
  }
};

/**
 * Sign Up User function
 * In a real app, this would send user data to POST /api/signup
 */
export const signupUser = async (userData: any): Promise<ApiResponse> => {
  console.log("Attempting signup with data:", userData);
  // await simulateDelay(1500);

  if (useMockApi) {
    // --- Mock Logic ---
    console.log("Mock API: Simulating signup flow...");
    console.log("Mock API: Signup successful (mock)");
    return {
      success: true,
      message: 'User signed up successfully (mock response)',
      // No user/token returned here, OTP verification is the next step
    };
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    if (!API_BASE_URL) {
      console.error("API_BASE_URL is not defined in environment variables.");
      return { success: false, error: 'API endpoint configuration error.' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, { // Example endpoint path
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

     if (!response.ok) {
      const errorData = await response.json();
      console.error("Signup API Error:", errorData);
      return { success: false, error: errorData.message || 'Signup failed' };
    }

    const result = await response.json();
     // Assuming backend sends { success: true, message: 'Signup successful, OTP sent' }
    return { success: true, message: result.message };

  } catch (error) {
    console.error("Network/Fetch Error during signup:", error);
      return { success: false, error: 'Network error during signup' };
    }
    // --- End Real API Logic ---
  }
};

/**
 * Verify OTP function
 * In a real app, this would send email/otp to POST /api/verify
 */
export const verifyOtp = async (email?: string | null, otp?: string): Promise<ApiResponse<{ user: User }>> => {
  console.log(`Verifying OTP ${otp} for ${email}`);
  // await simulateDelay(800);

  if (useMockApi) {
    // --- Mock Logic ---
    console.log("Mock API: Simulating OTP verification...");
    if (otp === '123456') {
       console.log("Mock API: OTP Verification successful");
       return {
         success: true,
         data: {
           // Provide mock data matching the context's User type
           user: {
             id: 'user-verified',
             email: email || 'unknown@example.com',
             name: 'Verified User', // Use 'name' field
             avatar: '/placeholder.svg?height=40&width=40', // Add mock avatar
             role: 'Verified Role', // Add mock role
             verified: true // Add mock verified status
           }
         },
         token: 'mockTokenVerified789'
       };
    } else {
       console.log("Mock API: OTP Verification failed");
       return {
         success: false,
         error: 'Invalid OTP (mock response)'
       };
    }
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    if (!API_BASE_URL) {
      console.error("API_BASE_URL is not defined in environment variables.");
      return { success: false, error: 'API endpoint configuration error.' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, { // Example endpoint path
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

     if (!response.ok) {
      const errorData = await response.json();
      console.error("Verify OTP API Error:", errorData);
      return { success: false, error: errorData.message || 'OTP verification failed' };
    }

    const result = await response.json();
     // Assuming backend sends { success: true, data: { user: {...}, token: '...' } }
    return { success: true, data: result.data, token: result.token }; // Return user and token

  } catch (error) {
    console.error("Network/Fetch Error during OTP verification:", error);
      return { success: false, error: 'Network error during OTP verification' };
    }
    // --- End Real API Logic ---
  }
};

/**
 * Forgot Password Request function
 * In a real app, this would send email to POST /api/forgot-password (or similar)
 */
export const forgotPasswordRequest = async (email?: string | null): Promise<ApiResponse> => {
  console.log(`Requesting password reset OTP for ${email}`);
  // await simulateDelay(700);

  if (useMockApi) {
    // --- Mock Logic ---
    console.log("Mock API: Simulating forgot password request...");
    console.log("Mock API: Forgot password request successful, simulating OTP send (mock)");
    return {
      success: true,
      message: 'If your email exists, an OTP has been sent (mock response)'
    };
    // --- End Mock Logic ---
  } else {
    // --- Real API Logic ---
    if (!API_BASE_URL) {
      console.error("API_BASE_URL is not defined in environment variables.");
      return { success: false, error: 'API endpoint configuration error.' };
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, { // Example endpoint path
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

     if (!response.ok) {
      const errorData = await response.json();
      console.error("Forgot Password API Error:", errorData);
      // Still return success: true as per original mock, but include error message potentially
      return { success: true, message: errorData.message || 'Request failed but pretending success' };
    }

    const result = await response.json();
     // Assuming backend sends { success: true, message: 'OTP sent if email exists' }
    return { success: true, message: result.message };

  } catch (error) {
    console.error("Network/Fetch Error during forgot password request:", error);
      return { success: false, error: 'Network error during forgot password request' };
    }
    // --- End Real API Logic ---
  }
};

// TODO: Add mock functions for resetPassword, etc. as needed
