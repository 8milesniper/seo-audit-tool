import dns from 'node:dns/promises'
import net from 'node:net'

// Blocks the audit-fetch proxy from being used to reach internal/private
// network targets (SSRF). This endpoint fetches whatever URL a visitor
// types in, so it must never be trusted to reach loopback, private, or
// link-local addresses (including the 169.254.169.254 cloud metadata IP).
const BLOCKED_HOSTNAMES = new Set(['localhost', '0.0.0.0'])

function isPrivateIp(ip) {
  const type = net.isIP(ip)
  if (type === 4) {
    const parts = ip.split('.').map(Number)
    if (parts[0] === 127) return true // loopback
    if (parts[0] === 10) return true // private
    if (parts[0] === 169 && parts[1] === 254) return true // link-local / metadata
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true // private
    if (parts[0] === 192 && parts[1] === 168) return true // private
    if (parts[0] === 0) return true
    return false
  }
  if (type === 6) {
    const lower = ip.toLowerCase()
    if (lower === '::1') return true // loopback
    if (lower.startsWith('fe80:') || lower.startsWith('fc') || lower.startsWith('fd')) return true // link-local/unique-local
    return false
  }
  return false
}

export async function assertSafeUrl(rawUrl) {
  let parsed
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new Error('Invalid URL')
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('Only http/https URLs are allowed')
  }

  const hostname = parsed.hostname.toLowerCase()
  if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith('.localhost')) {
    throw new Error('Refusing to fetch a local/internal address')
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error('Refusing to fetch a private/internal address')
    }
    return parsed
  }

  // Resolve the hostname so a public domain that points at a private/loopback
  // IP (DNS rebinding) is caught too, not just literal IPs typed by the user.
  let records
  try {
    records = await dns.lookup(hostname, { all: true })
  } catch {
    throw new Error('Could not resolve hostname')
  }

  for (const record of records) {
    if (isPrivateIp(record.address)) {
      throw new Error('Refusing to fetch a private/internal address')
    }
  }

  return parsed
}
