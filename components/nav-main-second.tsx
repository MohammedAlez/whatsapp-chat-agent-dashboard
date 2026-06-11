"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CirclePlusIcon, MailIcon } from "lucide-react"

export function NavMainSecond({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
}) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel>Manage</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => router.push(item.url)}
                  className={`p-5 py-6 rounded-xl cursor-pointer  ${
                    isActive
                      ? "bg-indigo-100/80 text-indigo-600 hover:bg-indigo-100/80 hover:text-indigo-600"
                      : "hover:bg-secondary "
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5 size-5!" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
