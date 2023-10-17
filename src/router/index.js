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
                    path: "dashboard",
                    component: () => import("@/views/home/DashboardStudentView.vue"),
                },
                {
                    name: "dashboard_admin",
                    path: "dashboard_admin",
                    component: () => import("@/views/home/DashboardAdminView.vue"),
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
                },
                {
                    name: "cursos/detalles",
                    path: "cursos/detalles/:id",
                    props: true,
                    component: () => import("@/views/courses/DetailsView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        if (!hasIdParam) {
                            // Si no se proporciona un :id, redirige a otra vista, por ejemplo, "acceso-denegado"
                            next({ name: 'cursos' });
                        } else {
                            next(); // Continuar con la navegación si se proporciona un :id
                        }
                    },
                },
                {
                    name: "cursos/examen",
                    path: "cursos/examen",
                    component: () => import("@/views/courses/ExamView.vue")
                },
                {
                    name: "sedes",
                    path: "sedes",
                    component: () => import("@/views/administrator/CampusView.vue")
                },
                {
                    name: "universidades",
                    path: "universidades",
                    component: () => import("@/views/administrator/UniversitiesView.vue")
                },
                {
                    name: "profesores",
                    path: "profesores",
                    component: () => import("@/views/administrator/TeachersView.vue")
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
        } else if (store.state.rol == "ADMINISTRADOR") {
            next({ name: 'dashboard_admin' });
        }
    } else if (to.path === '/' && store.state.isAuthenticated) {
        // Permitir la navegación
        if (store.state.rol == "ALUMNO") {
            next({ name: 'dashboard' });
        } else if (store.state.rol == "PROFESOR") {
            next({ name: 'especialidades' });
        } else if (store.state.rol == "ADMINISTRADOR") {
            next({ name: 'dashboard_admin' });
        }
    } else {
        next();
    }

});
export default router;


