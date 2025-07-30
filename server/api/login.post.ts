import type { H3Event } from 'h3'
import { readBody, sendError, createError } from 'h3'
import type { UserWithPassword } from '~/types/User'
import { getUsers } from '~/server/utils/getUsers' // ✅

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody<{ email: string; password: string }>(event)
    const users = await getUsers()

    const user = users.find(
        (u: UserWithPassword) => u.email === body.email && u.password === body.password
    )

    if (!user) {
        return sendError(
            event,
            createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
        )
    }

    const { password, ...safeUser } = user
    return safeUser
})
