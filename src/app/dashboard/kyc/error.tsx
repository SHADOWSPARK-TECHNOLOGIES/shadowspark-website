'use client'
import { RetryState } from '@/components/dashboard/polish'
export default function Error({reset}:{error:Error&{digest?:string};reset:()=>void}){return <RetryState title="KYC queue unavailable" description="The verification queue could not be loaded." onRetry={reset}/>
}
