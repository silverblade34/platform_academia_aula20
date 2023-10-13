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
                    path: "temarioscurso_profesores/:id",
                    props: true,
                    component: () => import("@/views/specialties/SyllabusView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        console.log(hasIdParam)
                        if (!hasIdParam) {
                            // Si no se proporciona un :id, redirige a otra vista, por ejemplo, "acceso-denegado"
                            next({ name: 'especialidades' });
                        } else {
                            next(); // Continuar con la navegación si se proporciona un :id
                        }
                    },
                },
                {
                    name: "administrar_preguntas",
                    path: "administrar_preguntas/:id",
                    props: true,
                    component: () => import("@/views/specialties/QuestionsView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        if (!hasIdParam) {
                            // Si no se proporciona un :id, redirige a otra vista, por ejemplo, "acceso-denegado"
                            next({ name: 'especialidades' });
                        } else {
                            next(); // Continuar con la navegación si se proporciona un :id
                        }
                    },
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
        if (store.state.rol == "ALUMNO") {
            next({ name: 'dashboard' }); // Redirige al dashboard1 si ya está autenticado y trata de acceder al login
        } else if (store.state.rol == "PROFESOR") {
            next({ name: 'especialidades' });
        }
    } else {
        // Permitir la navegación
        if (to.path === '/' && store.state.rol == "ALUMNO") {
            next({ name: 'dashboard' });
        } else if (to.path === '/' && store.state.rol == "PROFESOR") {
            next({ name: 'especialidades' });
        } else {
            next();
        }
    }
});
export default router;


