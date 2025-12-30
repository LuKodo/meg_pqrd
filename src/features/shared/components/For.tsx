import React from "react";

type ForProps<T> = {
  each: T[] | null | undefined;
  children: (item: T, index: number) => React.ReactNode;
  fallback?: React.ReactNode;
  keyExtractor?: (item: T, index: number) => React.Key;
};

function ItemRenderer<T>({ item, index, render }: { item: T; index: number; render: (item: T, index: number) => React.ReactNode }) {
  return <>{render(item, index)}</>;
}
const MemoItemRenderer = React.memo(ItemRenderer) as typeof ItemRenderer;

export function For<T>({ each, children, fallback = null, keyExtractor }: ForProps<T>) {
  if (!each || each.length === 0) return <>{fallback}</>;

  // Si la función children cambia constantemente, la memoización pierde eficacia.
  return (
    <>
      {each.map((item, i) => {
        const key = keyExtractor ? keyExtractor(item, i) : i;
        return <MemoItemRenderer key={key} item={item} index={i} render={children} />;
      })}
    </>
  );
}
