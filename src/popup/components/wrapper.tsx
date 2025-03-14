import type { PropsWithChildren } from 'react';

export function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className="text-center w-full p-5 h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
