import Image from "next/image";
import BlogPage from "./blog/page";
import AayushPage from "./aayush/page";
import LoginPage from "./(auth)/login/page";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello NEXTJS I am JS</h1>
      <BlogPage/>
      <AayushPage/>
      <LoginPage/>
    </div>
  );
}
