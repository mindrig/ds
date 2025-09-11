"use client";

import React from "react";
import {
  Breadcrumbs as RABreadcrumbs,
  Breadcrumb as RABreadcrumb,
  Link,
} from "react-aria-components";

export interface Breadcrumb {
  title: string;
  href: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: Array<Breadcrumb | undefined>;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <RABreadcrumbs className="flex space-x-4">
      {props.breadcrumbs.map(
        (item, index) =>
          item && (
            <RABreadcrumb key={index}>
              <Link href={item.href}>{item.title}</Link>
            </RABreadcrumb>
          ),
      )}
    </RABreadcrumbs>
  );
}
