import { readFile } from 'fs/promises'
import { join } from 'path'
import type { UserWithPassword, User } from '~/types/User'

export default defineEventHandler(async () => {
    const filePath = join(process.cwd(), 'public', 'users.json')
    const json = await readFile(filePath, 'utf-8')
    const users: UserWithPassword[] = JSON.parse(json)

    const safeUsers: User[] = users.map(({ password, ...rest }) => rest)

    return safeUsers
})