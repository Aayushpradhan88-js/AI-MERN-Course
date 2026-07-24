import Image from "next/image";
// src/app/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Find Your Next Job</h1>
      <p className="text-muted-foreground mb-8">
        Connecting candidates with the right opportunities.
      </p>
      <div className="flex gap-4">
        <AvatarGroupCount/>
        <Button >
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
        <Button variant="outline" >
          <Link href="/login">Login</Link>
        </Button>
       
          

      </div>
    </main>
  );
}
