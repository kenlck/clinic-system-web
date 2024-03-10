import { LoginForm } from "@/components/auth/LoginForm";

export default function Page() {
  return (
    <div className="max-w-screen-lg m-auto flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-bold mb-2">Clinic System</h1>
      <LoginForm />
    </div>
  );
}
