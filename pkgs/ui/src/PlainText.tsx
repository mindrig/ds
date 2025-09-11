import * as React from "react";

export interface PlainTextProps {
  children: string;
}

export function PlainText(props: PlainTextProps) {
  const chunks = props.children
    .split(/\r?\n\r?\n/g)
    .filter((chunk) => chunk.trim());
  return (
    <>
      {chunks.map((chunk, index) => {
        const lines = chunk.split(/\r?\n/g);
        return (
          <p key={index}>
            {lines.map((line, index) => (
              <>
                {line}
                {index < lines.length - 1 && <br />}
              </>
            ))}
          </p>
        );
      })}
    </>
  );
}
