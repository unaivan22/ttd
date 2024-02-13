"use client"

import React from 'react'
import Link from "next/link"
import { Label } from "@/components/ui/label"

export default function Footer() {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-x-4 gap-y-6 mt-6 mb-6 offPrint'>
      {/* <Link href="https://www.producthunt.com/posts/colors-11?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-colors&#0045;11" rel="noopener noreferrer" target="_blank">
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=437610&theme=light" alt="Colors - Generate&#0032;colors&#0032;to&#0032;give&#0032;you&#0032;color&#0032;suggestions | Product Hunt" className='w-[250px] h-[54px]' width="250" height="54" />
      </Link> */}
      <div className='flex items-center justify-center gap-x-4'>
        <div className='flex flex-row gap-x-2 item-center justify-center'>
          <span className="relative flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-green-400"></span></span>
            <Label>Open to work</Label>
        </div>
        <Label>·</Label>
        <Link href='https://dinivannendra.xyz' target='_blank' >@dinivannendra</Link>
      </div>
    </div>
  )
}