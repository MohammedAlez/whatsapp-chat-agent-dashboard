"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    name: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={`p-5 py-6 rounded-xl cursor-pointer ${
                      isActive
                        ? "bg-indigo-100/80 text-indigo-600 hover:bg-indigo-100/80 hover:text-indigo-600"
                        : "hover:bg-secondary "
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5 size-5!" />}
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
