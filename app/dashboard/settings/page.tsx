import React from 'react'

function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          {/* Add your settings content here */}
        </div>
      </div>
    </div>
  )
}

export default Page