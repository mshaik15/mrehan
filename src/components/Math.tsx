import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  children: string;
  block?: boolean;
}

export const Math = ({ children, block = false }: MathProps) => {
  if (block) {
    return (
      <div className="my-6 flex justify-center overflow-x-auto">
        <div className="min-w-0 max-w-full">
          <BlockMath math={children} />
        </div>
      </div>
    );
  }
  return (
    <span className="inline-block max-w-full overflow-x-auto">
      <InlineMath math={children} />
    </span>
  );
};

export const BlockMath_ = ({ children }: { children: string }) => (
  <Math block>{children}</Math>
);

export const InlineMath_ = ({ children }: { children: string }) => (
  <Math>{children}</Math>
);