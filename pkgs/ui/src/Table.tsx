"use client";

import { cnss } from "cnss";
import { ReactNode } from "react";
import {
  Cell,
  Column,
  Table as RATable,
  Row,
  TableBody,
  TableHeader,
} from "react-aria-components";

export interface TableHeader {
  id?: string;
  header?: boolean;
  align?: "left" | "center" | "right";
  content: ReactNode;
}

export interface TableCell {
  id?: string;
  content: ReactNode;
}

export interface TableRow {
  content: Array<ReactNode | TableCell>;
  href?: string;
}

export interface TableProps {
  label: string;
  header?: Array<TableHeader | ReactNode>;
  body: Array<TableRow | Array<ReactNode | TableCell>>;
  empty?: ReactNode;
}

export function Table(props: TableProps) {
  let rowHeaderIndex = props.header?.findIndex((h) => normalize(h)[0]?.header);
  rowHeaderIndex = rowHeaderIndex === -1 ? 0 : rowHeaderIndex;

  return (
    <RATable
      aria-label={props.label}
      className="shadow-xs bg-white border border-gray-300 rounded-lg border-separate border-spacing-0 overflow-hidden"
    >
      {props.header && (
        <TableHeader className="bg-gray-200 rounded-t-lg border-b border-gray-300">
          {props.header.map((header, index) => {
            const [obj, node] = normalize(header);

            return obj ? (
              <Column
                key={index}
                id={obj.id || ""}
                isRowHeader={rowHeaderIndex === index}
                className={cnss(
                  "py-2 px-4 text-left font-semibold text-gray-600",
                  obj?.align === "right" && "text-right",
                )}
              >
                {obj.content}
              </Column>
            ) : (
              <Column
                key={index}
                isRowHeader={rowHeaderIndex === index}
                className="py-2 px-4 text-left font-semibold text-gray-600"
              >
                {node}
              </Column>
            );
          })}
        </TableHeader>
      )}

      <TableBody
        renderEmptyState={props.empty ? () => props.empty : () => null}
      >
        {props.body.map((row, index) => {
          const [rowObj, rowNodes] = normalize(row);
          const cells = rowObj ? rowObj.content : rowNodes;
          return (
            <Row
              key={index}
              href={rowObj?.href || ""}
              className={cnss(
                rowObj?.href && "hover:bg-gray-100 cursor-pointer",
              )}
            >
              {cells.map((cell, index) => {
                const [headerObj] = normalize(props.header?.[index]);
                const [cellObj, cellNode] = normalize(cell);

                return (
                  <Cell
                    key={index}
                    className={cnss(
                      "py-2 px-4 text-left align-middle",
                      headerObj?.align === "right" && "text-right",
                    )}
                  >
                    {cellObj ? cellObj.content : cellNode}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </TableBody>
    </RATable>
  );
}

function normalize<Type extends TableHeader | TableCell>(
  header: Type | ReactNode,
): [Type, null] | [null, ReactNode];

function normalize<Type extends TableRow>(
  header: Type | Array<ReactNode | TableCell>,
): [Type, null] | [null, Array<ReactNode | TableCell>];

function normalize(header: any) {
  if (typeof header === "object" && header && "content" in header && header)
    return [header, null] as const;
  else return [null, header] as const;
}
