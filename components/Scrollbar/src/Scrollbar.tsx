import React, { PropsWithChildren, RefObject, useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import styles from "./Scrollbar.css";

export type ScrollbarTargetType = { scrollTo: (value: number) => void };

export interface ScrollbarProps<Target> {
  scrollTargetRef?: RefObject<Target>;
}

const Scrollbar = <Target extends ScrollbarTargetType>(
  props: PropsWithChildren<ScrollbarProps<Target>>
): JSX.Element => {
  const { scrollTargetRef, children } = props;
  const simpleBarScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: Event) => {
    if (scrollTargetRef?.current) scrollTargetRef.current.scrollTo((e.target as Element).scrollTop);
  };

  useEffect(() => {
    simpleBarScrollRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      simpleBarScrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SimpleBar scrollableNodeProps={{ ref: simpleBarScrollRef }} className={styles.scrollbar}>
      {children}
    </SimpleBar>
  );
};

export { Scrollbar };
