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
    export default class ParameterValue extends Vue {
        @Prop({default: ""})
        public parameterValue!: string;

        @Prop({default: ""})
        public keyword!: string;

        get value() {
            console.log("parameterValue=" + this.parameterValue)
            console.log("keyword=" + this.keyword)
            if (this.keyword == 'pattern') {
                return [this.parameterValue];
            }
            return this.parameterValue.split("=");
        }
    }
</script>
}
