import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  children: string;
  block?: boolean;
}

export const Math = ({ children, block = false }: MathProps) => {
  if (block) {
    return (
      <div className="my-6 flex justify-center">
        <BlockMath math={children} />
      </div>
    );
  }
  return <InlineMath math={children} />;
};

// Convenience components
export const BlockMath_ = ({ children }: { children: string }) => (
  <Math block>{children}</Math>
);

export const InlineMath_ = ({ children }: { children: string }) => (
  <Math>{children}</Math>
);