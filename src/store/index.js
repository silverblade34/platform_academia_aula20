import { createStore } from "vuex";

const localStorageKey = 'DJsdfg-2352LLDSF-dfg-jsah33454-//4415gfsfd';

export default createStore({
    state: {
        isAuthenticated: false,
        rol: '',
        usuario: '',
        codigo: '',
        idUser: '',
        evaluationGenerate: {}
    },
    getters: {

    },
    mutations: {
        setIsAuthenticated(state, value) {
            state.isAuthenticated = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setIdUser(state, value) {
            state.idUser = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setRol(state, value) {
            state.rol = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setUsuario(state, value) {
            state.usuario = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setCodigo(state, value) {
            state.codigo = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setEvaluationGenerate(state, value) {
            state.evaluationGenerate = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        // Agregar una mutación para inicializar el estado desde localStorage al cargar la página
        initializeStateFromLocalStorage(state) {
            const storedState = localStorage.getItem(localStorageKey);
            if (storedState) {
                Object.assign(state, JSON.parse(storedState));
            }
        }
    },
    actions: {
        initializeStateFromLocalStorage({ commit }) {
            commit('initializeStateFromLocalStorage');
        }
    }
})