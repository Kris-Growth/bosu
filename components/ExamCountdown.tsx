"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function ExamCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Použít lokální čas pro datum zkoušek (13. 12. 2025 00:00:00)
    const examDate = new Date(2025, 11, 13, 0, 0, 0).getTime(); // Měsíc je 0-indexovaný, takže 11 = prosinec

    const calculateTimeLeft = (): TimeLeft | null => {
      const now = new Date().getTime();
      const difference = examDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Nastavit počáteční hodnotu
    setTimeLeft(calculateTimeLeft());

    // Aktualizovat každou sekundu
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !timeLeft) {
    return (
      <div className="font-mono text-sm text-gray-500">
        Načítání...
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200">
      <span className="text-xs text-gray-600 font-medium">
        Zkoušky:
      </span>
      <div className="flex items-center gap-1 font-mono text-sm font-semibold tabular-nums">
        <span 
          className="inline-block min-w-[2ch] text-center text-gray-900 transition-all duration-300"
          key={`days-${timeLeft.days}`}
        >
          {formatNumber(timeLeft.days)}
        </span>
        <span className="text-gray-500">d</span>
        <span className="mx-0.5 text-gray-500">:</span>
        <span 
          className="inline-block min-w-[2ch] text-center text-gray-900 transition-all duration-300"
          key={`hours-${timeLeft.hours}`}
        >
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="text-gray-500">h</span>
        <span className="mx-0.5 text-gray-500">:</span>
        <span 
          className="inline-block min-w-[2ch] text-center text-gray-900 transition-all duration-300"
          key={`minutes-${timeLeft.minutes}`}
        >
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="text-gray-500">m</span>
        <span className="mx-0.5 text-gray-500">:</span>
        <span 
          className="inline-block min-w-[2ch] text-center text-gray-900 animate-pulse"
          key={`seconds-${timeLeft.seconds}`}
        >
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="text-gray-500">s</span>
      </div>
    </div>
  );
}

