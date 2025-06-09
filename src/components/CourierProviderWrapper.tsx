"use client";

import { CourierProvider } from "@trycourier/react-provider";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface CourierTokenPayload {
  scope: string; // should be `user_id:<email>`
}

export const CourierWrapper = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchToken = async () => {
      try {
        const res = await fetch("/api/token");
        if (!res.ok) {
          throw new Error(`Token request failed: ${res.status}`);
        }
        
        const data = await res.json();
        const token = data.token;

        if (!token) throw new Error("No token returned");

        // Decode JWT to extract user_id and validate token
        const decoded = jwtDecode<CourierTokenPayload>(token);
        const scopeMatch = decoded.scope?.match(/^user_id:(.+?)(?:\s|$)/);
        const userIdFromToken = scopeMatch?.[1];

        if (!userIdFromToken) {
          throw new Error("Invalid token scope format");
        }

        // Validate token has required scopes
        const scopes = decoded.scope.split(' ');
        const requiredScopes = ['inbox:read:messages', 'realtime:connect'];
        const missingScopes = requiredScopes.filter(scope => !scopes.includes(scope));
        
        if (missingScopes.length > 0) {
          throw new Error(`Token missing required scopes: ${missingScopes.join(', ')}`);
        }

        // Ensure component is still mounted
        if (!mounted) return;

        // Add a small delay to ensure token is fully processed
        await new Promise(resolve => setTimeout(resolve, 100));

        setToken(token);
        setUserId(userIdFromToken);

        console.log("✅ Loaded Courier token:", token);
        console.log("✅ Extracted userId:", userIdFromToken);
        console.log("✅ Token scopes:", scopes);
      } catch (err) {
        console.error("❌ Failed to load Courier token:", err);
        if (mounted) {
          setToken(null);
          setUserId(null);
        }
      }
    };

    fetchToken();

    return () => {
      mounted = false;
    };
  }, []);

  if (!token || !userId) {
    return <div style={{ padding: 16 }}>Loading Courier...</div>;
  }

  return (
    <CourierProvider 
      userId={userId} 
      authorization={token}
      clientKey={process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY}
      tenantId="8aba6106-606b-45e3-9e8a-973aa6673355"
    >
      {children}
    </CourierProvider>
  );
};