"use client";

import { createContext, useEffect, useState } from "react";

export const userContext = createContext<{ user: any; loading: boolean }>({
  user: null,
  loading: true,
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();

        if (data.success) {
          setUser(data.user); // ✅ full user object from backend
        } else {
          console.warn("⚠️ User not logged in");
        }
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, loading }}>
      {children}
    </userContext.Provider>
  );
}
