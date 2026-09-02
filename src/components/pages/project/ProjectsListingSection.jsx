"use client";

import React, { useRef } from "react";
import { ProjectsFilterProvider } from "@/context/ProjectsFilterContext";
import useProjectsFilter from "@/hooks/useProjectsFilter";
import ProejctCard from "@/components/pages/project/ProejctCard";
import Button from "@/components/ui/Button";
import ProjectFilterHeader from "@/components/pages/project/ProjectFilterHeader";
import Pagination from "@/components/pages/project/Pagination";

/**
 * LAYER 4: UI PRESENTATION LAYER
 * Assembles pure modular presentational components (ProjectFilterHeader, ProjectsGrid, Pagination)
 * inside the ProjectsFilterProvider context wrapper.
 */

// Projects Grid & Empty State View
function ProjectsGrid() {
  const { paginatedProjects, resetFilters } = useProjectsFilter();

  if (paginatedProjects.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 shadow-sm max-w-lg mx-auto my-12">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          No Projects Match Your Criteria
        </h3>
        <p className="text-sm text-neutral-500 mb-6">
          Try resetting your filters or selecting a different location or
          business type to discover our available developments.
        </p>
        <Button variant="primary" onClick={resetFilters} className="mx-auto">
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
      {paginatedProjects.map((project) => (
        <ProejctCard key={project.id || project.slug} project={project} />
      ))}
    </div>
  );
}

// Listing Section Body
function ProjectsListingContent() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F9F8F5] text-neutral-900 px-4 sm:px-8 pb-5 lg:pb-10"
    >
      <div className="max-w-7xl mx-auto">
        <ProjectFilterHeader />
        <ProjectsGrid />
        <Pagination scrollRef={sectionRef} />
      </div>
    </section>
  );
}

// Main Component wrapping Layer 4 UI with Layer 2 Context Provider
export default function ProjectsListingSection() {
  return (
    <ProjectsFilterProvider itemsPerPage={6}>
      <ProjectsListingContent />
    </ProjectsFilterProvider>
  );
}
