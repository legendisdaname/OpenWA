export type SessionLinkMethod = 'qr' | 'pairing';

export interface SessionLinkConfig {
  linkMethod?: SessionLinkMethod;
  phoneNumber?: string;
}

export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function getSessionLinkConfig(config: Record<string, unknown> | null | undefined): {
  linkMethod: SessionLinkMethod;
  phoneNumber?: string;
} {
  const linkMethod =
    config?.linkMethod === 'pairing' ? ('pairing' as const) : ('qr' as const);
  const rawPhone = typeof config?.phoneNumber === 'string' ? config.phoneNumber : undefined;
  const phoneNumber = rawPhone ? normalizePhoneNumber(rawPhone) : undefined;
  return { linkMethod, phoneNumber };
}

export function buildSessionConfig(
  existing: Record<string, unknown> | null | undefined,
  linkMethod?: SessionLinkMethod,
  phoneNumber?: string,
): Record<string, unknown> {
  const config = { ...(existing ?? {}) };
  if (linkMethod) {
    config.linkMethod = linkMethod;
  }
  if (phoneNumber) {
    config.phoneNumber = normalizePhoneNumber(phoneNumber);
  }
  return config;
}
