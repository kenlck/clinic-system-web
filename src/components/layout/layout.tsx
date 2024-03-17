import { ScrollArea } from "../ui/scroll-area";
import Header from "./header";
import Sidebar from "./sidebar";

export function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <ScrollArea className="w-full h-full pt-14 px-4">{props.children}</ScrollArea>
      </div>
    </>
  );
}
