import { CheckAuth } from "@/components/auth/CheckAuth";
import { Layout } from "@/components/layout/layout";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <CheckAuth />
      {children}
    </Layout>
  );
}
