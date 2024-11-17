import React from 'react';
import Link from 'next/link';

const OrderPage = () => {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Order details</h1>

            <Link href="/">Back to main</Link>
        </div>
    );
}

export default OrderPage;

