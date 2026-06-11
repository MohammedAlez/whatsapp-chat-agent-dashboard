import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Separator } from './ui/separator'

function SystemStatus() {

    const systems = [
        {
            name: 'AI Agent',
            status: 'active',
        },
        {
            name: 'Whatsapp',
            status: 'connected',
        },
        {
            name: 'Telegram alerts',
            status: 'on',
        },
        {
            name: 'Google Sheets',
            status: 'synced',
        }
    ]
    return (
            <Card>
                <CardHeader>System Status</CardHeader>
                <CardContent className='mb-0'>
                    <div className="">
                        {systems.map((system, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <p className="font-medium items-center flex gap-3">
                                    <span className="size-2 inline-block rounded-full bg-green-600 "></span>
                                    {system.name}
                                </p>
                                <p className="text-sm text-muted-foreground">{system.status}</p>
                                
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
    )
}


export default SystemStatus