'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { QueryProvider } from '@/components/dashboard/query-provider'
import { Sidebar, Topbar } from '@/components/dashboard/components'
export default function DashboardLayout({children}:{children:React.ReactNode}){const pathname=usePathname();const [collapsed,setCollapsed]=useState(false);const [mobile,setMobile]=useState(false);return <QueryProvider><div className="dashboard-root"><div className={mobile?'mobile-overlay block':'mobile-overlay'} onClick={()=>setMobile(false)}/><div className={mobile?'mobile-sidebar open':'mobile-sidebar'}><Sidebar pathname={pathname} collapsed={false} onCollapse={()=>setMobile(false)} onClose={()=>setMobile(false)}/></div><div className="hidden lg:block"><Sidebar pathname={pathname} collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)} onClose={()=>undefined}/></div><div className={`dashboard-main ${collapsed?'lg:pl-0':''}`}><Topbar pathname={pathname} onMenu={()=>setMobile(true)}/><main id="dashboard-main" className="dashboard-content">{children}</main></div></div></QueryProvider>}
