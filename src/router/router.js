import {createWebHistory, createRouter} from 'vue-router'
import TodoList from '@/components/todoList'

const history = createWebHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: '/todo-list',
            component: TodoList
        }
    ]
})

export default router;