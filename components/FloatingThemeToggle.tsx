'use client';

import ThemeToggle from './ThemeToggle';

export default function FloatingThemeToggle() {
  return (
    <div className="fixed top-6 right-6 z-50">
      <ThemeToggle />
    </div>
  );
}
