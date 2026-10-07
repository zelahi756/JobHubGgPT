import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function requireAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || !['EDITOR','VERIFIER','ADMIN','SUPER_ADMIN'].includes(role || '')) throw new Error('FORBIDDEN');
  return session.user;
}
export function canEdit(role?: string) { return ['EDITOR','ADMIN','SUPER_ADMIN'].includes(role || ''); }
export function canVerify(role?: string) { return ['VERIFIER','ADMIN','SUPER_ADMIN'].includes(role || ''); }
export async function audit(actorUserId: string | undefined, action: string, entityType: string, entityId: string, metadata?: object) {
  await db.auditLog.create({ data: { actorUserId, action, entityType, entityId, metadata } });
}
