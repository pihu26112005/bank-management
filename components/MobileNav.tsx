"use client";
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link';


const MobileNav = ({ user }: MobileNavProps) => {
    const path = usePathname();
    return (
        <section className='w-full max-w-[264px'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src='/icons/hamburger.svg'
                        width={30}
                        height={30}
                        alt='menu'
                    />
                </SheetTrigger>
                <SheetClose asChild>
                    <SheetContent side='left' className='bg-white border-none'>
                        <SheetHeader>
                            <Link
                                href='/'
                                className='flex items-center gap-2 cursor-pointer mb-12'
                            >
                                <Image
                                    src='/icons/logo.svg'
                                    alt='home'
                                    width={24}
                                    height={24}
                                />
                                <h1 className='text-26 font-ibm-plex-serif text-black-1'>Bnak-APP</h1>
                            </Link>

                            <div className="mobilenav-sheet">
                                <nav className="flex flex-col gap-4 h-full">
                                    {sidebarLinks.map((link, index) => {
                                        const isActive = path === link.route || path.startsWith(link.route);
                                        return <>
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                key={index}
                                                href={link.route}
                                                className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                                            >
                                                <div className="relative size-6">
                                                    <Image
                                                        src={link.imgURL}
                                                        alt={link.label}
                                                        height={20}
                                                        width={20} 
                                                        className={cn({ 'brightness-[3] invert-0': isActive })}
                                                    />
                                                </div>
                                                <p className={cn('text-16 font-semibold text-black-2', { '!text-white': isActive })}>{link.label}</p>

                                            </Link>
                                            </SheetClose>
                                        </>
                                    }
                                    )
                                    }
                                    user
                                </nav>
                            footer
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </SheetClose>
            </Sheet>

        </section>
    )
}

export default MobileNav