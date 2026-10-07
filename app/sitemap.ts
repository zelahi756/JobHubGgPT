import {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://jobhub.pk';return [{url:base},{url:`${base}/jobs`},{url:`${base}/tenders`},{url:`${base}/newspapers`},{url:`${base}/login`}];}
