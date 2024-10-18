import { useEffect, useCallback, useState } from "react";
import { useMotionValue, useSpring, animate } from "framer-motion";

const spring = { damping: 400, stiffness: 3000, restDelta: 0.0001 };

export function useFollowPointer(elementRef, wrapperRef) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  const handlePointerMove = useCallback(
    (event) => {
      if (!elementRef.current || !wrapperRef.current) return;

      const element = elementRef.current;
      const wrapper = wrapperRef.current;
      const wrapperRect = wrapper.getBoundingClientRect();

      // Calculate position relative to the wrapper
      const relativeX = event.clientX - wrapperRect.left;
      const relativeY = event.clientY - wrapperRect.top;

      // Update the position
      xPoint.set(relativeX - element.offsetWidth / 2);
      yPoint.set(relativeY - element.offsetHeight / 2);
    },
    [xPoint, yPoint]
  );

  const handlePointerLeave = useCallback(() => {
    if (!wrapperRef.current) return;
    
    const wrapper = wrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // Animate to center position
    animate(xPoint, wrapperRect.width / 2 - (elementRef.current?.offsetWidth || 0) / 2, {
      ...spring
    });
    animate(yPoint, wrapperRect.height / 2 - (elementRef.current?.offsetHeight || 0) / 2, {
      ...spring
    });
  }, [xPoint, yPoint]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.addEventListener("pointermove", handlePointerMove);
    wrapper.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [handlePointerMove, handlePointerLeave]);

  useState(() => {
    setTimeout(() => {
      handlePointerLeave();
    }, 50)
  }, [])

  return { x, y };
}