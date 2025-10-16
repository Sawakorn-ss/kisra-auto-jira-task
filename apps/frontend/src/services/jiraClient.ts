import { ofetch } from 'ofetch'
import type { JiraConnectionState } from '../types'

interface JiraRequestOptions {
  method?: 'GET' | 'POST';
  query?: Record<string, string | number | boolean | undefined>;
  body?: Record<string, unknown>;
}

function encodeBasicAuth (email: string, apiToken: string) {
  const raw = `${email}:${apiToken}`
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(raw)
  }

  const nodeBuffer = (globalThis as { Buffer?: { from(input: string, encoding?: string): { toString(encoding: string): string } } }).Buffer
  if (nodeBuffer) {
    return nodeBuffer.from(raw, 'utf-8').toString('base64')
  }

  throw new Error('Unable to encode credentials in this environment')
}

function buildAuthHeader (connection: JiraConnectionState) {
  if (connection.authMethod === 'apiToken') {
    if (!connection.email || !connection.apiToken) {
      throw new Error('Jira email and API token are required for API token authentication')
    }
    return `Basic ${encodeBasicAuth(connection.email, connection.apiToken)}`
  }

  if (connection.authMethod === 'oauth') {
    if (!connection.accessToken) {
      throw new Error('Missing Jira OAuth access token')
    }
    return `Bearer ${connection.accessToken}`
  }

  throw new Error(`Unsupported Jira authentication method: ${connection.authMethod}`)
}

export async function jiraApiRequest<T> (
  apiBaseUrl: string,
  connection: JiraConnectionState,
  path: string,
  options: JiraRequestOptions = {}
): Promise<T> {
  if (!connection.siteUrl) {
    throw new Error('Jira site URL is required')
  }

  const base = apiBaseUrl.replace(/\/$/, '')
  const url = new URL(`${base}${path}`)

  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const headers: Record<string, string> = {
    'X-Jira-Site': connection.siteUrl,
    Authorization: buildAuthHeader(connection),
    Accept: 'application/json'
  }

  const method = options.method ?? 'GET'
  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json'
  }

  return ofetch<T>(url.toString(), {
    method,
    headers,
    body: options.body
  })
}
