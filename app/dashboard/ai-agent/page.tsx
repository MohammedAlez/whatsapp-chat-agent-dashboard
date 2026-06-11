import React from 'react'
import { SiteHeader } from '@/components/site-header'
import { AiAgentCards } from '@/components/ai-agent-cards'
import { SystemPrompt } from '@/components/system-prompt'
import { AiControls } from '@/components/agent-controls'
import { AgentPerformance } from '@/components/agent-performance'

// Upcoming components to build
// import { ModelConfigCard } from '@/components/model-config-card'
// import { ControlsCard } from '@/components/controls-card'
// import { PerformanceCard } from '@/components/performance-card'

export default function Page() {
  // Mock data for the cards to prevent TypeScript errors based on our previous setup
  const statsData = {
    numberOfChats: 15,
    totalLeadsCaptured: 3,
    pausedByAgent: 0,
    pausedByUsers: 3
  }

  return (
    <>
      <SiteHeader title='AI Agent Settings' />
      
      <main className="h-full container mx-auto px-4 py-6 flex flex-col gap-6">
        
        {/* Top Stats Cards */}
        <AiAgentCards />

        {/* Main Grid Layout (12 Columns)
          This gives us perfect control over the 66/33 and 50/50 splits on large screens,
          while gracefully collapsing to a single column (100% width) on mobile.
        */}
        <div className="h-full grid grid-cols-12 gap-6">
          
          {/* Top-Left: System Prompt (66% -> 8/12 columns) */}
          <div className="col-span-12 lg:col-span-8">
            <SystemPrompt />
          </div>
          {/* Bottom-Left: Controls (50% -> 6/12 columns) */}
          <div className="col-span-12 lg:col-span-4">
            <AiControls />
          </div>

        </div>
      </main>
    </>
  )
}