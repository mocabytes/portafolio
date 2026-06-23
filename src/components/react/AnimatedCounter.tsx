import { useState, useEffect, useRef } from "react";

export interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  duration?: number;
  once?: boolean;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  label = "",
  duration = 2000,
  once = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          if (once) observer.disconnect();

          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(step);
            }
          };

          rafRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, once]);

  return (
    <div ref={ref} className="animated-counter">
      <span className="animated-counter__number">
        {prefix}
        {count}
        {suffix}
      </span>
      {label && <span className="animated-counter__label">{label}</span>}
    </div>
  );
}
