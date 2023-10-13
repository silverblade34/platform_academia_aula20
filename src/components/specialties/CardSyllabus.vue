<template>
    <v-card variant="elevated">
        <v-card-item>
            <div>
                <div class="text-overline mb-1">
                    Geometria
                </div>
                <div class="text-h6 mb-1">
                    Segmento de recta
                </div>
                <v-card-text>
                    <v-timeline density="compact" align="start">
                        <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                            size="x-small">
                            <div class="mb-4">
                                <div>{{ message.message }}</div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </div>
        </v-card-item>
        <v-card-actions class="flex justify-end px-5">
            <router-link :to="'/administrar_preguntas/' + id">
                <v-btn size="small" color="teal-lighten-2" variant="flat">
                    Crear
                </v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: {
        id: String
    },
    data: () => ({
        messages: [
            {
                message: `Triángulos. Congruencia de triángulos. `,
                color: 'deep-purple-lighten-1',
            },
            {
                message: 'Desigualdades geométricas. ',
                color: 'green',
            },
            {
                message: 'Lugares geométricos de la mediatriz de un segmento y la bisectriz de un ángulo.',
                color: 'deep-purple-lighten-1',
            },
        ],
    }),
}
</script>