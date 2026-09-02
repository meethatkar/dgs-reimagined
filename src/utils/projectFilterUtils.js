/**
 * LAYER 1: DOMAIN / UTILITY LAYER
 * Pure domain functions for filtering, option extraction, and pagination logic.
 */

/**
 * Helper to extract deduplicated, case-insensitively unique options for a field
 */
function getUniqueFieldValues(projects = [], key) {
  const map = new Map();
  projects.forEach((project) => {
    const rawVal = project[key];
    if (rawVal && typeof rawVal === "string" && rawVal.trim()) {
      const normalizedKey = rawVal.trim().toLowerCase();
      // Only set if not already encountered (prevents duplicates regardless of casing/spacing)
      if (!map.has(normalizedKey)) {
        map.set(normalizedKey, rawVal.trim());
      }
    }
  });
  return Array.from(map.values());
}

export function extractFilterOptions(projects = []) {
  return {
    businessTypes: ["all", ...getUniqueFieldValues(projects, "businessType")],
    locations: ["all", ...getUniqueFieldValues(projects, "location")],
    statuses: ["all", ...getUniqueFieldValues(projects, "status")],
  };
}

export function filterProjects(projects = [], { selectedType = "all", selectedLocation = "all", selectedStatus = "all" }) {
  return projects.filter((project) => {
    // Business Type Match
    const matchType =
      selectedType === "all" ||
      project.businessType?.trim().toLowerCase() === selectedType.trim().toLowerCase() ||
      (selectedType.trim().toLowerCase() === "residential" && project.type?.toLowerCase().includes("bhk"));

    // Location Match
    const matchLocation =
      selectedLocation === "all" ||
      project.location?.trim().toLowerCase().includes(selectedLocation.trim().toLowerCase());

    // Status Match
    const matchStatus =
      selectedStatus === "all" ||
      project.status?.trim().toLowerCase().includes(selectedStatus.trim().toLowerCase());

    return matchType && matchLocation && matchStatus;
  });
}

export function paginateProjects(filteredProjects = [], currentPage = 1, itemsPerPage = 6) {
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  return {
    paginatedProjects,
    totalPages,
    currentPage: safePage,
    totalCount: filteredProjects.length,
    startCount: filteredProjects.length === 0 ? 0 : startIndex + 1,
    endCount: Math.min(startIndex + itemsPerPage, filteredProjects.length),
  };
}
