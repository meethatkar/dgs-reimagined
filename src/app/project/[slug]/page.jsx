import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectHeaderInfo from "@/components/projectDetails/ProjectHeaderInfo";
import AmenitiesSection from "@/components/projectDetails/AmenitiesSection";
import ConnectivitySection from "@/components/projectDetails/ConnectivitySection";
import ProjectCtaBanner from "@/components/projectDetails/ProjectCtaBanner";
import Arrow from "../../../../public/icons/Arrow";

export async function generateStaticParams() {
  return (projects || []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | DGS Group" };
  }

  return {
    title: `${project.title} - ${project.location} | DGS Group`,
    description: `Explore ${project.title} in ${project.location}. Featuring ${project.type} residences starting at ${project.price}.`,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { amenities, connectivity } = project;

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-neutral-900 flex flex-col justify-between">
      <main className="pb-20 pt-5 lg:pt-10 px-5 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/project"
          className="inline-flex items-center gap-2 text-sm lg:text-lg font-medium uppercase tracking-widest text-neutral-600 hover:text-primary transition-colors mb-8 group"
        >
          <Arrow className="w-5 h-5 rotate-180 inline-block transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Main Visual */}
          <div className="lg:col-span-8 relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            {project.status && (
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-primary/90 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                {project.status}
              </div>
            )}
          </div>

          {/* Project Header Info Box */}
          <ProjectHeaderInfo project={project} />
        </div>

        {/* 1. AMENITIES SECTION */}
        <AmenitiesSection amenities={amenities} />

        {/* 2. NEIGHBORHOOD & CONNECTIVITY SECTION */}
        <ConnectivitySection connectivity={connectivity} />

        {/* CTA BANNER */}
        <ProjectCtaBanner projectTitle={project.title} />
      </main>
    </div>
  );
}
