import { ReactNode } from "react";

interface TemplateProps {
  className?: string;
  children?: ReactNode | undefined;
}

export default function Template(props: TemplateProps) {
  return <div>{props.children}</div>;
}
