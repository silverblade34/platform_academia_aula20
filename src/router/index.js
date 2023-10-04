import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
                {
                    name: "dashboard",
                    path: "",
                    component: () => import("@/views/home/DashboardView.vue"),
                },
                {
                    name: "cursos",
                    path: "cursos",
                    component: () => import("@/views/courses/CourseView.vue"),
                },
                {
                    name: "especialidades",
                    path: "especialidades",
                    component: () => import("@/views/specialties/SpecialtiesView.vue"),
                },
                {
                    name: "temarioscurso_profesores",
                    path: "temarioscurso_profesores",
                    component: () => import("@/views/specialties/SyllabusView.vue"),
                },
                {
                    name: "administrar_preguntas",
                    path: "administrar_preguntas",
                    component: () => import("@/views/specialties/QuestionsView.vue"),
                }
            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/login/LoginView.vue")
        }
    ]
})
// Navigation Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a la página de inicio de sesión
        next({ name: 'login' });
    } else if (to.name === 'login' && store.state.isAuthenticated) {
        next({ name: 'dashboard' }); // Redirige al dashboard1 si ya está autenticado y trata de acceder al login
    } else {
        // Permitir la navegación
        next();
    }
});
export default router;


