'use client'
import { RetryState } from '@/components/dashboard/polish'
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <RetryState title="Analytics unavailable" description="We could not load reporting data." onRetry={reset}/>
}
