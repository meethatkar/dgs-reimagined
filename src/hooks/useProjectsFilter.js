"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProjectsContext } from "@/context/ProjectsFilterContext";
import { extractFilterOptions, filterProjects, paginateProjects } from "@/utils/projectFilterUtils";

/**
 * LAYER 3: CONTROLLER / CUSTOM HOOK LAYER
 * Consumes Context (Layer 2) and Domain Utils (Layer 1).
 * Computes derived filter state and exposes custom high-level business methods to Layer 4 (UI).
 */
export function useProjectsFilter() {
  const router = useRouter();

  // Consume Store / Context (Layer 2)
  const {
    projectsData,
    selectedType,
    selectedLocation,
    selectedStatus,
    currentPage,
    itemsPerPage,
    setSelectedType,
    setSelectedLocation,
    setSelectedStatus,
    setCurrentPage,
  } = useProjectsContext();

  // 1. Extract filter options using Domain Layer (Layer 1)
  const { businessTypes, locations, statuses } = useMemo(() => {
    return extractFilterOptions(projectsData);
  }, [projectsData]);

  // 2. Filter projects using Domain Layer (Layer 1)
  const filteredProjects = useMemo(() => {
    return filterProjects(projectsData, {
      selectedType,
      selectedLocation,
      selectedStatus,
    });
  }, [projectsData, selectedType, selectedLocation, selectedStatus]);

  // 3. Paginate projects using Domain Layer (Layer 1)
  const {
    paginatedProjects,
    totalPages,
    currentPage: safePage,
    totalCount,
    startCount,
    endCount,
  } = useMemo(() => {
    return paginateProjects(filteredProjects, currentPage, itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const isFiltered =
    selectedType !== "all" ||
    selectedLocation !== "all" ||
    selectedStatus !== "all";

  // 4. Custom Action Methods for UI Layer (Layer 4)
  const changeBusinessType = useCallback(
    (type) => {
      setSelectedType(type);
      setCurrentPage(1);
    },
    [setSelectedType, setCurrentPage]
  );

  const changeLocation = useCallback(
    (location) => {
      setSelectedLocation(location);
      setCurrentPage(1);
    },
    [setSelectedLocation, setCurrentPage]
  );

  const changeStatus = useCallback(
    (status) => {
      setSelectedStatus(status);
      setCurrentPage(1);
    },
    [setSelectedStatus, setCurrentPage]
  );

  const goToPage = useCallback(
    (page, scrollRef = null) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [totalPages, setCurrentPage]
  );

  const nextPage = useCallback(
    (scrollRef = null) => {
      if (currentPage < totalPages) {
        goToPage(currentPage + 1, scrollRef);
      }
    },
    [currentPage, totalPages, goToPage]
  );

  const prevPage = useCallback(
    (scrollRef = null) => {
      if (currentPage > 1) {
        goToPage(currentPage - 1, scrollRef);
      }
    },
    [currentPage, goToPage]
  );

  const resetFilters = useCallback(() => {
    setSelectedType("all");
    setSelectedLocation("all");
    setSelectedStatus("all");
    setCurrentPage(1);
    router.push("/project", { scroll: false });
  }, [setSelectedType, setSelectedLocation, setSelectedStatus, setCurrentPage, router]);

  // Export structured state and methods to Layer 4
  return {
    // State
    selectedType,
    selectedLocation,
    selectedStatus,
    currentPage: safePage,
    itemsPerPage,

    // Filter Options
    businessTypes,
    locations,
    statuses,

    // Derived Computed Data
    filteredProjects,
    paginatedProjects,
    totalPages,
    totalCount,
    startCount,
    endCount,
    isFiltered,

    // Custom Methods for UI Layer
    changeBusinessType,
    changeLocation,
    changeStatus,
    goToPage,
    nextPage,
    prevPage,
    resetFilters,
  };
}

export default useProjectsFilter;
