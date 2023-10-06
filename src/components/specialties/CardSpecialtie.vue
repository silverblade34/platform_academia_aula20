<template>
    <v-card max-width="400">
        <v-row dense>
            <v-col cols="12">
                <v-card color="white" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between border-red-500 px-3 py-1">
                        <div class="card_specialtie">
                            <v-card-title class="text-lg text-gray-600">
                                {{ title }}
                            </v-card-title>

                            <v-card-subtitle>Foster the People</v-card-subtitle>

                            <v-card-actions>
                                <router-link :to="'/temarioscurso_profesores/' + id">
                                    <v-btn class="ms-2" variant="outlined" size="small" color="blue">
                                        VER MÁS
                                    </v-btn>
                                </router-link>
                            </v-card-actions>
                        </div>

                        <v-avatar class="ma-3" size="125" rounded="0">
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