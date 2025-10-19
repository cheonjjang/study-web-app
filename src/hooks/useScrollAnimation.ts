import { useEffect, useRef } from 'react';

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트에 들어오면 animate 클래스 추가
            entry.target.classList.add('is-visible');
          } else {
            // 뷰포트를 벗어나면 animate 클래스 제거 (다시 위로 올라가도 반복)
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.1, // 요소의 10%가 보이면 트리거
        rootMargin: '0px 0px -50px 0px', // 뷰포트 하단에서 50px 위에서 트리거
        ...options
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return elementRef;
};
