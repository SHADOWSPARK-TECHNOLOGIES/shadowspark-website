'use client'
import { RetryState } from '@/components/dashboard/polish'
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <RetryState title="Workflow editor unavailable" description="We could not load the automation canvas." onRetry={reset}/>
}
