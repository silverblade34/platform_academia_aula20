<template>
    <v-card max-width="400">
        <v-row dense>
            <v-col cols="12">
                <v-card color="white" theme="dark">
                    <div class="grid grid-cols-6 border-red-500 px-3 py-1">
                        <div class="card_specialtie col-span-4">
                            <v-card-title class="text-gray-600 pb-4 pt-2">
                                <span class="text-sm">
                                    {{ title }}
                                </span>
                            </v-card-title>
                            <v-card-actions>
                                <router-link :to="'/temarioscurso_profesores/' + id">
                                    <v-btn class="ms-2" variant="outlined" size="small" color="blue">
                                        VER MÁS
                                    </v-btn>
                                </router-link>
                            </v-card-actions>
                        </div>

                        <v-avatar class="ma-3 col-span-2" size="100" rounded="0">
                            <v-img
                                src="https://static.vecteezy.com/system/resources/previews/007/488/567/non_2x/geometry-course-concept-icon-geometrical-shapes-triangle-on-whiteboard-mathematical-problem-idea-thin-line-illustration-school-subjects-isolated-outline-drawing-editable-stroke-vector.jpg"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default ({
    name: "CardSpecialtie",
    props: {
        title: String,
        id: String
    }
})
</script>
<style>
.card_specialtie {
    font-family: 'Montserrat', sans-serif !important;
}
</style>