"use client";

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Footer from './Footer';

const Sidebar = ({ user }: SiderbarProps) => {
    const path = usePathname();
    console.log('path', path)
    return (
        <section className="sidebar">
            <nav className='flex flex-col gap-4'>
                <Link
                    href='/'
                    className='flex items-center gap-2 cursor-pointer mb-12'
                >
                    <Image
                        src='/icons/logo.svg'
                        alt='home'
                        width={24}
                        height={24}
                        className='cursor-pointer size-[24px] max-xl:size-14'
                    />
                    <h1 className='sidebar-logo'>Bnak-APP</h1>
                </Link>

                {sidebarLinks.map((link, index) => {
                    const isActive = path === link.route || path.endsWith(link.route);

                    return <>
                        <Link
                            key={index}
                            href={link.route}
                            className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
                        >
                            <div className="relative size-6">
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                fill
                                className={cn({'brightness-[3] invert-0': isActive})}
                            />
                            </div>
                            <p  className={cn('sidebar-label',{'!text-white':isActive})}>{link.label}</p>
                            
                        </Link>
                    </>
                }
                ) 
                }
                user
            </nav>
            <Footer user = {user} />   
        </section>
    )
}

export default Sidebar