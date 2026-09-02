"use client";

import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { projects as defaultProjects } from "@/data/projects";

/**
 * LAYER 2: CONTEXT / STORE LAYER
 * Responsible strictly for managing primitive states and core setters.
 */

const ProjectsFilterContext = createContext(null);

const DEFAULT_ITEMS_PER_PAGE = 6;

function ProjectsFilterStateContainer({ children, itemsPerPage = DEFAULT_ITEMS_PER_PAGE, initialData = defaultProjects }) {
  const searchParams = useSearchParams();

  // Initial values from URL search params
  const initialType = searchParams.get("type") || searchParams.get("businessType") || "all";
  const initialLocation = searchParams.get("location") || "all";
  const initialStatus = searchParams.get("status") || "all";

  // Primitive State Definitions
  const [projectsData, setProjectsData] = useState(initialData);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state if URL query params mutate
  useEffect(() => {
    if (searchParams.get("type")) setSelectedType(searchParams.get("type"));
    if (searchParams.get("businessType")) setSelectedType(searchParams.get("businessType"));
    if (searchParams.get("location")) setSelectedLocation(searchParams.get("location"));
    if (searchParams.get("status")) setSelectedStatus(searchParams.get("status"));
  }, [searchParams]);

  // Context Payload
  const value = {
    // State Primitives
    projectsData,
    selectedType,
    selectedLocation,
    selectedStatus,
    currentPage,
    itemsPerPage,

    // Core Mutators / Setters
    setProjectsData,
    setSelectedType,
    setSelectedLocation,
    setSelectedStatus,
    setCurrentPage,
  };

  return <ProjectsFilterContext.Provider value={value}>{children}</ProjectsFilterContext.Provider>;
}

export function ProjectsFilterProvider({ children, itemsPerPage, initialData }) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[30vh] flex items-center justify-center bg-[#F9F8F5]">
          <div className="text-primary font-bold animate-pulse">Loading Context...</div>
        </div>
      }
    >
      <ProjectsFilterStateContainer itemsPerPage={itemsPerPage} initialData={initialData}>
        {children}
      </ProjectsFilterStateContainer>
    </Suspense>
  );
}

export function useProjectsContext() {
  const context = useContext(ProjectsFilterContext);
  if (!context) {
    throw new Error("useProjectsContext must be used within a ProjectsFilterProvider");
  }
  return context;
}

export default ProjectsFilterContext;
