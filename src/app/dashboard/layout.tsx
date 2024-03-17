import { CheckAuth } from "@/components/auth/CheckAuth";
import Header from "@/components/layout/header";
import { Layout } from "@/components/layout/layout";
import Sidebar from "@/components/layout/sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <CheckAuth />
      {children}
    </Layout>
  );
}
