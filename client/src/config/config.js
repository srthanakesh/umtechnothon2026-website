/**
 * Application configuration
 * Centralizes all environment variables and configuration settings
 */

// For Vite, environment variables must be prefixed with VITE_
const config = {
  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api/",
  },

  // Supabase configuration (if you're using it)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  },

  // Application settings
  app: {
    name: "Technothon 2026",
    env: import.meta.env.MODE || "development",
    isDev: import.meta.env.DEV === true,
    isProd: import.meta.env.PROD === true,
  },
};

// Log configuration in development
if (config.app.isDev) {
  console.log("App config:", config);
}

export default config;
