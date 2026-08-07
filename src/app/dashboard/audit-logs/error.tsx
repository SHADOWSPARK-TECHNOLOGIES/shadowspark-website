'use client'
import { RetryState } from '@/components/dashboard/polish'
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <RetryState title="Audit logs unavailable" description="We could not load the activity history." onRetry={reset}/>
}
