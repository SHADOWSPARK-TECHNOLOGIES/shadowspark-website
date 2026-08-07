'use client'
import { RetryState } from '@/components/dashboard/polish'
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <RetryState title="Inbox unavailable" description="We could not load your messages." onRetry={reset}/>
}
