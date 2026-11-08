import { Children, cloneElement, isValidElement, type ElementType, type ReactNode, type ReactElement } from "react";
import type React from "react";
import clsx from "@/lib/clsx";

type Props = { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>;

/**
 * Heading whose words rise into place one after another, each inside its own mask, when it scrolls into view.
 * Strings are split into words at render time (no DOM mutation after hydration).
 */
export default function Split({ as: Tag = "h2", className, children, ...rest }: Props) {
  let wi = 0;
  const walk = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .map((part, k) =>
            !part || /^\s+$/.test(part) ? part : (
              <span key={k} className="w"><span className="w__i" style={{ "--wi": wi++ } as React.CSSProperties}>{part}</span></span>
            ),
          );
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ className?: string; style?: React.CSSProperties; children?: ReactNode }>;
        if (el.props.className?.includes("accent") || el.props.className?.includes("grad")) {
          return cloneElement(el, { className: clsx(el.props.className, "w"), style: { ...el.props.style, "--wi": wi++ } as React.CSSProperties });
        }
        if (el.type === "br") return el;
        return cloneElement(el, {}, walk(el.props.children));
      }
      return child;
    });
  return (
    <Tag className={className} data-split="" {...rest}>
      {walk(children)}
    </Tag>
  );
}
