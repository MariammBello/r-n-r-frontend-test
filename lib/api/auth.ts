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

// Get base URL from environment variable (will be undefined until set)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'; // Default to relative /api if not set

/**
 * Mock Login User function (Triggers OTP Send)
 * In a real app, this would send credentials to POST /api/login
 */
export const loginUser = async (email?: string | null, password?: string): Promise<ApiResponse<{ email: string | null | undefined }>> => {
  console.log(`Mock API: Attempting login (to trigger OTP) for ${email}`);
  await simulateDelay(1000); // Simulate network latency

  // TODO: Replace with actual fetch call to POST /api/login

  // --- Mock Logic ---
  // Simulate success if credentials are 'valid' (e.g., test user)
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
};

/**
 * Mock Sign Up User function
 * In a real app, this would send user data to POST /api/signup
 */
export const signupUser = async (userData: any): Promise<ApiResponse> => {
  console.log("Mock API: Attempting signup with data:", userData);
  await simulateDelay(1500); // Simulate network latency

  // TODO: Replace with actual fetch call to POST /api/signup

  // --- Mock Logic ---
  // Simulate successful signup (backend creates user, likely triggers OTP send next)
  console.log("Mock API: Signup successful (mock)");
  return {
    success: true,
    message: 'User signed up successfully (mock response)',
    // No user/token returned here, OTP verification is the next step
  };
  // --- End Mock Logic ---
};

/**
 * Mock Verify OTP function
 * In a real app, this would send email/otp to POST /api/verify
 */
export const verifyOtp = async (email?: string | null, otp?: string): Promise<ApiResponse<{ user: User }>> => {
  console.log(`Mock API: Verifying OTP ${otp} for ${email}`);
  await simulateDelay(800);

  // TODO: Replace with actual fetch call to POST /api/verify

  // --- Mock Logic ---
  // Simulate success if OTP is, for example, '123456'
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
};

/**
 * Mock Forgot Password Request function
 * In a real app, this would send email to POST /api/forgot-password (or similar)
 */
export const forgotPasswordRequest = async (email?: string | null): Promise<ApiResponse> => {
  console.log(`Mock API: Requesting password reset OTP for ${email}`);
  await simulateDelay(700);

  // TODO: Replace with actual fetch call to POST /api/forgot-password

  // --- Mock Logic ---
  // Simulate success (backend would send OTP if email exists)
  console.log("Mock API: Forgot password request successful, simulating OTP send (mock)");
  return {
    success: true,
    message: 'If your email exists, an OTP has been sent (mock response)'
  };
  // --- End Mock Logic ---
};

// TODO: Add mock functions for resetPassword, etc. as needed
