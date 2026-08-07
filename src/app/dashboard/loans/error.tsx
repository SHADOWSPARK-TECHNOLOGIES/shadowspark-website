'use client'
import { RetryState } from '@/components/dashboard/polish'
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <RetryState title="Loans are unavailable" description="We could not load the lending queue. Try again to refresh the latest applications." onRetry={reset}/>
}
