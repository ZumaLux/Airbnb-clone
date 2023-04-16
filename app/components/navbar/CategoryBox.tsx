"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // define an empty query
    let currentQuery = {};

    // look through the current params and parse them from string to obj
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // add the new category to the query
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // check if the current label is alredy selected
    // and remove label filter on second click
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // generate the url string
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true } // skip empty options
    );
    console.log(url);
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? `border-b-neutral-800` : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
