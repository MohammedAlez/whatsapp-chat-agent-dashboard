"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, MessagesSquare, MessageCircle, User, UserCheck, Info, Bot, Book, BookOpen, ChartColumnBig, RainbowIcon, Rainbow } from "lucide-react"
import { NavMainSecond } from "./nav-main-second"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/overview",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Conversations",
      url: "/dashboard/conversations",
      icon: MessageCircle,
    },
    {
      title: "Leads",
      url: "/dashboard/leads",
      icon: UserCheck,
    },
    {
      title: "Unanswered",
      url: "/dashboard/unanswered",
      icon: Info,
    },
  ],
  manage: [
    {
      title: "AI Agent",
      url: "/dashboard/ai-agent",
      icon: Bot,
    },
    {
      title: "Knowledge Base",
      url: "/dashboard/knowledge-base",
      icon: BookOpen,
    },
    {
      title: "Aanlytics",
      url: "/dashboard/analytics",
      icon: ChartColumnBig,
    },
  ],
  navSecondary: [
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings2Icon
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b py-3 pb-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent"
            >
              <a href="#">
                <Rainbow className="size-12! text-indigo-600" />
                <span className="text-2xl font-semibold ml-2 ">messagatek</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMainSecond items={data.manage} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
