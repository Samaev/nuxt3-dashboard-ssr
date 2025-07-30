import { readFile } from 'fs/promises'
import { join } from 'path'
import type { UserWithPassword } from '~/types/User'

export async function getUsers(): Promise<UserWithPassword[]> {
    const filePath = join(process.cwd(), 'public', 'users.json')
    const json = await readFile(filePath, 'utf-8')
    return JSON.parse(json)
}
