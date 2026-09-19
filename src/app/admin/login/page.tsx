import type { Metadata } from "next";
import AdminLogin from "../_components/AdminLogin";

export const metadata: Metadata = {
  title: { absolute: "Admin Login | NYC Digital Agency" },
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
