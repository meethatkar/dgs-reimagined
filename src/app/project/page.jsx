import ProjectsListingSection from "@/components/pages/project/ProjectsListingSection";

export const metadata = {
  title: "Our Landmark Projects | DGS Group",
  description:
    "Explore DGS Group's landmark residential towers, commercial offices, and industrial hubs across prime locations in Mumbai.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen bg-[#F9F8F5]">
      <div className="pt-5 lg:pt-10">
        <ProjectsListingSection />
      </div>
    </main>
  );
}
