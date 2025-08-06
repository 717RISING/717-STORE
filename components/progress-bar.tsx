"use client"

import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { usePathname, useSearchParams } from 'next/navigation'

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: 0.1 });

    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();
    const handleError = () => NProgress.done();

    // In Next.js App Router, there aren't direct router events like in Pages Router.
    // We can simulate progress bar behavior by starting on route change and
    // completing after a short delay or when content is likely loaded.
    // For a more precise control, you might need to integrate with data fetching states.

    // Start progress on route change
    handleStart();

    // Complete progress after a short delay, assuming content loads quickly
    const timer = setTimeout(() => {
      handleComplete();
    }, 500); // Adjust delay as needed

    return () => {
      clearTimeout(timer);
      NProgress.done(); // Ensure it's done on unmount
    };
  }, [pathname, searchParams]); // Re-run effect when pathname or searchParams change

  return null; // This component doesn't render anything visible
}
