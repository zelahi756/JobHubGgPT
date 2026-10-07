import {NextResponse} from 'next/server'; import {getPublicTenders} from '@/lib/public'; export async function GET(){return NextResponse.json(await getPublicTenders());}
