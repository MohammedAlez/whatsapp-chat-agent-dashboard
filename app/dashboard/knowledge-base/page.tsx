import { SiteHeader } from '@/components/site-header'
import React from 'react'

import KBFilters from '@/components/knowledge-base-filters'
import { KBHeader } from '@/components/knowledge-base-header'
import KBEntries from '@/components/knowledge-base-entries'
import KBAddEntry from '@/components/knowledge-base-add-entry'

function Page() {
    return (
        <>
            <SiteHeader title='Knowldge Base' />
            
            <main className="container mx-auto px-4 py-6 flex flex-col gap-6">
              
              {/* Top Stats Cards */}
              <KBHeader />
              {/* <KBFilters /> */}
              <div className="flex ">
                  <div className="flex-1">
                    <KBEntries />
                  </div>
                  <div className="">
                    
                  </div>
              </div>
            </main>
        </>
    )
}

export default Page