import Image from "next/image";
// src/app/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeatureJobs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <FeaturedJobs />
      <Testimonials />
      <Footer />
    </div>
  );
}
