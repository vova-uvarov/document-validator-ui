<template>
    <span>
        <span v-if="value.length===1">
            {{value[0]}}
        </span>

        <span v-if="value.length===2">
            {{value[0]}} = <b> {{value[1]}}</b>
        </span>
    </span>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Parameters extends Vue {
        @Prop({default: ""})
        public parameterValue!: string;

        get value() {
            return this.parameterValue.split("=");
        }
    }
</script>
}
