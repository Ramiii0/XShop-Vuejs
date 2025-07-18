import type { User } from "@/types/users/user"
import { reactive } from "vue"

const users = reactive<User[]>([
    {
        id: '1',
        name: 'User 1',
        email: 'user1@example.com',
        noOfTickets: 20
    },
    {
        id: '2',
        name: 'User 2',
        email: 'user2@example.com',
        noOfTickets: 0
    },
    {
        id: '3',
        name: 'User 3',
        email: 'user3@example.com',
        noOfTickets: 0
    }
])
export default users