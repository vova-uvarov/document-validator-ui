<template>
    <span>

        <span v-if="value.length===1">
            <v-tooltip bottom max-width="250px">
                <template v-slot:activator="{ on }">
                    <span v-on="on">
                        {{value[0]|truncateString(75)}}
                    </span>
                </template>
                <span>{{value[0]}}</span>
            </v-tooltip>

        </span>

        <span v-if="value.length===2">
            <v-tooltip bottom max-width="250px">
                <template v-slot:activator="{ on }">
                    <span v-on="on">
<!--                        todo плохо показывается длинное значение без пробелов-->
                        {{value[0]}} = <b> {{value[1]|truncateString(75)}}</b>
                    </span>
                </template>
                <span>{{value[0]}} = <b> {{value[1]}}</b></span>
            </v-tooltip>
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
            console.log("keyword=" + this.keyword + ", parameterValue=" + this.parameterValue)
            if (this.keyword.startsWith('pattern') || this.keyword.startsWith('expression') || this.keyword.startsWith('requiredIf')) {
                return [this.parameterValue];
            }
            return this.parameterValue.split("=");
        }
    }
</script>
}
