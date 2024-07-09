"use client";

import { formatAmount } from '@/lib/utils'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useState } from 'react'
import { Button } from './ui/button';

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {

    const title = account.shareableId

    const [hasCopied, setHasCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(title);
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    return (
        <div className='flex flex-col'>
            <Link href={`/transaction-history/?id=${account.appwriteItemId}`} className='bank-card'>
                <div className="bank-card_content">
                    <div>
                        <h1 className="text-16 font-semibold text-white">
                            {account.name || userName}
                        </h1>
                        <p className='font-ibm-plex-serif font-black text-white'>
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>
                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h1 className="text-12 font-semibold text-white">
                                {userName}
                            </h1>
                            <h2 className="text-12 font-semibold text-white">
                                ●●/●●
                            </h2>
                        </div>
                        <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                            ●●●● ●●●● ●●●● <span className='text-16'>{account?.mask} </span>
                        </p>
                    </article>
                </div>
                <div className="bank-card_icon">
                    <Image
                        src="/icons/Paypass.svg"
                        alt="Visa"
                        width={20}
                        height={24}
                    />
                    <Image
                        src="/icons/mastercard.svg"
                        alt="Visa"
                        width={45}
                        height={32}
                    />
                </div>
            </Link>
            {showBalance === true && (
                <>
                    <Button
                        data-state="closed"
                        className="mt-3 flex max-w-[320px] gap-4"
                        variant="secondary"
                        onClick={copyToClipboard}
                    >
                        <p className="line-clamp-1 w-full max-w-full text-xs font-medium text-black-2">
                            {title}
                        </p>

                        {!hasCopied ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="mr-2 size-4"
                            >
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="mr-2 size-4"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        )}
                    </Button>
                </>
            )}
        </div>
    )
}

export default BankCard