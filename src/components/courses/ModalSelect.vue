<template>
    <div class="text-center">
        <v-btn class="text-none ms-4 text-white" color="blue-darken-1" rounded="2" @click="dialog = true">
            Realizar examen
        </v-btn>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-toolbar color="blue">
                    <span class="px-4 w-full text-center">Seleccionar temarios que deseas evaluar</span>
                </v-toolbar>
                <v-card-text>
                    <div class=" bg-gray-100 w-full rounded-lg my-2 flex gap-2 px-3">
                        <v-checkbox label="Planteo de ecuaciones" color="secondary" value="secondary"
                            hide-details></v-checkbox>
                    </div>
                    <div class=" bg-gray-100 w-full rounded-lg my-2 flex gap-2 px-3">
                        <v-checkbox label="Figuras geometricas" color="secondary" value="secondary"
                            hide-details></v-checkbox>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-2" variant="tonal" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <router-link to='/cursos/examen' class="pl-3">
                    <v-btn color="blue-lighten-1" variant="tonal" @click="dialog = false">
                        Aceptar
                    </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
}
</script>