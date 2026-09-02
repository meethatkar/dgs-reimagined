"use client";

import React from "react";
import useProjectsFilter from "@/hooks/useProjectsFilter";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";

// 1. Section Header View
export function FilterHeader() {
  return (
    <div className="mb-10 text-center max-w-3xl mx-auto">
      <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
        DGS Landmark Portfolio
      </span>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight mt-2 text-neutral-900">
        Our Featured Projects
      </h1>
      <p className="text-neutral-600 mt-4 text-sm sm:text-base leading-relaxed font-sans">
        Explore our crafted residential towers, commercial offices, and industrial hubs designed for elevated living and high-yield returns across prime Mumbai locations.
      </p>
    </div>
  );
}

// 2. Filter Controls View
export function FilterControls() {
  // Consumes high-level state & custom methods from Layer 3 Custom Hook
  const {
    selectedType,
    selectedLocation,
    selectedStatus,
    businessTypes,
    locations,
    statuses,
    totalCount,
    isFiltered,
    changeBusinessType,
    changeLocation,
    changeStatus,
    resetFilters,
  } = useProjectsFilter();

  return (
    <div className="bg-[#FFFFFF] rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 border border-neutral-200/80 mb-12">
      {/* FILTER CONTROL HEADER & RESET */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
        <Label>
          Filter Projects ({totalCount} {totalCount === 1 ? "Result" : "Results"})
        </Label>

        {isFiltered && (
          <Button variant="link" onClick={resetFilters}>
            Reset Filters
          </Button>
        )}
      </div>

      {/* FILTER DROPDOWNS USING REUSABLE SELECT & LABEL COMPONENTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. BUSINESS TYPE DROPDOWN */}
        <div className="flex flex-col gap-2">
          <Label>Business Type</Label>
          <Select
            value={selectedType}
            onChange={changeBusinessType}
            options={businessTypes}
            defaultOptionLabel="All Business Types"
          />
        </div>

        {/* 2. LOCATION DROPDOWN */}
        <div className="flex flex-col gap-2">
          <Label>Location</Label>
          <Select
            value={selectedLocation}
            onChange={changeLocation}
            options={locations}
            defaultOptionLabel="All Locations"
          />
        </div>

        {/* 3. PROJECT STATUS DROPDOWN */}
        <div className="flex flex-col gap-2">
          <Label>Project Status</Label>
          <Select
            value={selectedStatus}
            onChange={changeStatus}
            options={statuses}
            defaultOptionLabel="All Statuses"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectFilterHeader() {
  return (
    <>
      <FilterHeader />
      <FilterControls />
    </>
  );
}
