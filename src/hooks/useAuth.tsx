import { apiUrl } from "@/constants/constants";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* Load current session */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/auth/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setIsAdmin(data.isAdmin);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* Login */
  const signIn = async (email: string, password: string) => {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    setUser(data.user);

    // fetch admin status
    const meRes = await fetch(`${apiUrl}/auth/me`, {
      credentials: "include",
    });

    if (meRes.ok) {
      const me = await meRes.json();
      setIsAdmin(me.isAdmin);
    }

    return true;
  };

  /* Logout */
  const signOut = async () => {
    await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
