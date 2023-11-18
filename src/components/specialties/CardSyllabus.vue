<template>
    <v-card variant="elevated">
        <div class="content_card">
            <v-card-item class="content_text">
                <div class="text-sm pb-3 pt-2 pl-3">
                    {{ courseName }}
                </div>
                <div class="text-sm mb-1 font-bold uppercase text-gray-500 pl-3 pr-4">
                    {{ syllabusName }}
                </div>
                <v-card-text>
                    <v-timeline density="compact" align="start">
                        <v-timeline-item v-for="message in syllabusItems" :key="message.message" :dot-color="message.color"
                            size="x-small">
                            <div class="mb-4">
                                <div>{{ message.message }}</div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card-item>
            <v-card-actions class="flex justify-end px-5 content_btn">
                <router-link :to="'/administrar_preguntas/' + syllabusId">
                    <v-btn size="small" color="teal-lighten-2" variant="flat">
                        Crear
                    </v-btn>
                </router-link>
            </v-card-actions>
        </div>
    </v-card>
</template>
<script>
export default {
    props: {
        syllabusId: Number,
        syllabusItems: Array,
        courseName: String,
        syllabusName: String
    },
}
</script>
<style scoped>
.content_card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
}

.content_text {
    /* Si quieres que ocupe todo el espacio disponible, puedes usar flex-grow */
    flex-grow: 1;
    display: block !important;
}

.content_btn {
    /* Para que el botón se alinee al final del contenedor */
    align-self: flex-end;
}
</style>