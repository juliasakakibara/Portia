'use client';

import { useEffect, useRef } from 'react';

interface CurtainTextProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function CurtainText({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0
}: CurtainTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && textRef.current) {
            // Adiciona a classe após um pequeno delay para garantir que a transição seja aplicada
            setTimeout(() => {
              entry.target.classList.add('curtain--visible');
            }, delay);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Dispara a animação um pouco antes do elemento entrar na viewport
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  // Define a direção da animação
  const getTransform = () => {
    switch(direction) {
      case 'up': return 'translateY(100%)';
      case 'down': return 'translateY(-100%)';
      case 'left': return 'translateX(100%)';
      case 'right': return 'translateX(-100%)';
      default: return 'translateY(100%)';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
    >
      <span 
        ref={textRef}
        className="curtain-text inline-block"
        style={{
          transform: getTransform(),
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${delay}ms`,
          willChange: 'transform',
          display: 'inline-block',
          opacity: 0.01, // Inicia com opacidade quase zero para evitar piscadas
          transitionProperty: 'transform, opacity',
          transitionDuration: '0.8s, 0.2s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1), ease-out'
        }}
      >
        {children}
      </span>
      <style jsx>{`
        .curtain--visible .curtain-text {
          transform: translate(0, 0) !important;
          opacity: 1 !important;
        }
        
        /* Reduzir movimento para usuários que preferem menos animação */
        @media (prefers-reduced-motion: reduce) {
          .curtain-text {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
