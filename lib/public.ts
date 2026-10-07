import { db } from '@/lib/db';

export async function getPublicJobs(filters: { q?: string; province?: string; city?: string; category?: string; jobType?: string; bps?: string; education?: string; experience?: string; sort?: string } = {}) {
  const now = new Date();
  return db.job.findMany({
    where: { verified: true, active: true, deadline: { gte: now },
      ...(filters.q ? { OR: [{ title: { contains: filters.q, mode: 'insensitive' } }, { description: { contains: filters.q, mode: 'insensitive' } }, { organization: { name: { contains: filters.q, mode: 'insensitive' } } }] } : {}),
      ...(filters.province ? { province: { name: filters.province } } : {}),
      ...(filters.city ? { city: { name: filters.city } } : {}),
      ...(filters.category ? { category: { name: filters.category } } : {}),
      ...(filters.jobType ? { jobType: filters.jobType } : {}),
      ...(filters.bps ? { bps: { contains: filters.bps, mode: 'insensitive' } } : {}),
      ...(filters.education ? { education: { contains: filters.education, mode: 'insensitive' } } : {}),
      ...(filters.experience ? { experience: { contains: filters.experience, mode: 'insensitive' } } : {}),
    },
    include: { organization: true, category: true, province: true, city: true, source: true },
    orderBy: filters.sort === 'deadline' ? { deadline: 'asc' } : filters.sort === 'newest' ? { publishedAt: 'desc' } : { createdAt: 'desc' },
  });
}

export async function getPublicJob(slug: string) {
  return db.job.findFirst({ where: { slug, verified: true, active: true, deadline: { gte: new Date() } }, include: { organization: true, category: true, province: true, city: true, source: true } });
}

export async function getPublicTenders() {
  return db.tender.findMany({ where: { verified: true, active: true, closingAt: { gte: new Date() } }, include: { province: true, city: true, source: true }, orderBy: { closingAt: 'asc' } });
}

export async function getPublicTender(slug: string) {
  return db.tender.findFirst({ where: { slug, verified: true, active: true, closingAt: { gte: new Date() } }, include: { province: true, city: true, source: true } });
}
