import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationProps {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const useCounterAnimation = ({
  end,
  duration = 2000,
  start = 0,
  suffix = '',
  prefix = '',
  decimals = 0
}: UseCounterAnimationProps) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeOutQuart;
      
      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, start, duration, decimals]);

  const displayValue = `${prefix}${count.toLocaleString()}${suffix}`;

  return { count: displayValue, ref: elementRef };
};
