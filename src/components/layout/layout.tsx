import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Header from "./header";
import Sidebar from "./sidebar";

export function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="w-full h-[100vw-3.5rem] mt-14 px-4 overflow-y-auto overflow-x-hidden">{props.children}</div>
      </div>
    </>
  );
}
