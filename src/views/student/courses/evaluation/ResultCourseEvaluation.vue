<template>
    <h1>Resultados del examen del curso {{ idCourse }}</h1>
</template>
<script>
import { onMounted, ref } from "vue"

export default ({
    props: {
        id: String
    },
    setup(props) {
        const idCourse = ref('');
        onMounted(() => {
            idCourse.value = props.id
        })
        return{
            idCourse
        }
    }
})
</script>