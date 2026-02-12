
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page has been merged into Settings
export default function MembershipRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/settings');
    }, [router]);

    return null;
}
