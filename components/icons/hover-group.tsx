"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type MutableRefObject,
  type RefAttributes,
} from "react";

/** Imperative handle every animated icon exposes. */
export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

type AnimatedIcon = ForwardRefExoticComponent<
  { size?: number; strokeWidth?: number; className?: string } & RefAttributes<AnimatedIconHandle>
>;

const GroupContext = createContext<MutableRefObject<Set<AnimatedIconHandle>> | null>(null);

/**
 * Wraps a card, row or button so hovering anywhere inside it plays every
 * GroupIcon it contains, instead of only when the pointer is on the icon.
 */
export function HoverGroup<T extends ElementType = "div">({
  as,
  onMouseEnter,
  onMouseLeave,
  ...props
}: { as?: T } & ComponentPropsWithoutRef<T>) {
  const icons = useRef(new Set<AnimatedIconHandle>());
  const Tag: ElementType = as ?? "div";

  return (
    <GroupContext.Provider value={icons}>
      <Tag
        {...props}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          icons.current.forEach((icon) => icon.startAnimation());
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          icons.current.forEach((icon) => icon.stopAnimation());
          onMouseLeave?.(e);
        }}
      />
    </GroupContext.Provider>
  );
}

/** An animated icon driven by the nearest HoverGroup; on its own it animates on its own hover. */
export function GroupIcon({
  icon: Icon,
  ...props
}: { icon: AnimatedIcon; size?: number; strokeWidth?: number; className?: string }) {
  const group = useContext(GroupContext);
  const ref = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    const handle = ref.current;
    const icons = group?.current;
    if (!icons || !handle) return;
    icons.add(handle);
    return () => {
      icons.delete(handle);
    };
  }, [group]);

  return <Icon ref={group ? ref : undefined} {...props} />;
}

/**
 * An animated icon that plays as soon as it mounts, or follows `active` when
 * given (true plays, false returns to rest). Used for spinners, the success
 * check and the menu icon that morphs into a close icon.
 */
export function StateIcon({
  icon: Icon,
  active = true,
  ...props
}: { icon: AnimatedIcon; active?: boolean; size?: number; strokeWidth?: number; className?: string }) {
  const ref = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    if (active) ref.current?.startAnimation();
    else ref.current?.stopAnimation();
  }, [active]);

  return <Icon ref={ref} {...props} />;
}
