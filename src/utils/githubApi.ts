/**
 * Utility to fetch folder structure from GitHub repository
 * Uses GitHub API to dynamically load fact-sheets structure
 */

export interface GitHubItem {
  name: string
  type: 'file' | 'dir'
  path: string
  children?: GitHubItem[]
}

const GITHUB_API_BASE = 'https://api.github.com'
const REPO_OWNER = 'SuneVadsholtLyster'
const REPO_NAME = 'EnterpriseTransformation'
const FOLDER_PATH = 'fact-sheets'

/**
 * Fetch folder structure from GitHub repo
 */
export async function fetchFolderStructure(): Promise<GitHubItem[]> {
  try {
    const items = await fetchGitHubContents(`${REPO_OWNER}/${REPO_NAME}`, FOLDER_PATH)
    return buildHierarchy(items)
  } catch (error) {
    console.error('Error fetching folder structure:', error)
    return []
  }
}

/**
 * Recursively fetch contents from GitHub API
 */
async function fetchGitHubContents(repo: string, path: string): Promise<GitHubItem[]> {
  const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  // Handle single file response
  if (!Array.isArray(data)) {
    return [{ name: data.name, type: data.type as 'file' | 'dir', path: data.path }]
  }

  // Filter out non-directory/markdown items for the menu
  return data
    .filter((item) => item.type === 'dir' || item.name.endsWith('.md'))
    .map((item) => ({
      name: cleanItemName(item.name),
      type: item.type as 'file' | 'dir',
      path: item.path,
    }))
}

/**
 * Build nested hierarchy from flat GitHub items
 */
function buildHierarchy(items: GitHubItem[]): GitHubItem[] {
  // For now, return flat structure
  // Can be extended to support nested folders if needed
  return items.sort((a, b) => {
    // Dirs first, then alphabetically
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

/**
 * Clean up item names (remove extensions, format)
 */
function cleanItemName(name: string): string {
  // Remove .md extension
  if (name.endsWith('.md')) {
    return name.slice(0, -3)
  }
  // Replace hyphens with spaces, capitalize
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
