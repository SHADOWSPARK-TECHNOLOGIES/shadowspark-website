export const naira = (value:number) => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(value)
export const compactNaira = (value:number) => value >= 1000000 ? `₦${(value/1000000).toFixed(1)}M` : value >= 1000 ? `₦${Math.round(value/1000)}K` : naira(value)
export const shortDate = (value:string) => new Intl.DateTimeFormat('en-NG',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value))
export const relativeDate = (value:string) => { const hours=Math.max(1,Math.round((Date.now()-new Date(value).getTime())/3600000)); return hours<24?`${hours}h ago`:`${Math.round(hours/24)}d ago` }
