<template>
    <div>
        <v-data-table dense
                      :hide-default-footer="true"
                      :headers="headers"
                      :items="items"
                      :disable-sort="true"
                      class="elevation-1"
        >
            <template v-slot:item.value="{ item }">
                <ParameterValue :parameter-value="item.value" :keyword="keyword"/>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ParameterValue from "@/components/fieldRule/ParameterValue.vue";

    @Component({
        components: {ParameterValue}
    })
    export default class Parameters extends Vue {
        @Prop({default: ""})
        public rawParameters!: string;

        @Prop({default: ""})
        public keyword!: string;

        get headers() {
            return [
                {text: "Название", value: "name"},
                {text: "Значение", value: "value"}
            ]

        }

        get items() {
            console.log("rawParameters=" + this.rawParameters)
            console.log("keyword=" + this.keyword)
            if (this.keyword === 'pattern') {
                return [
                    {
                        name: this.rawParameters.split("->")[0],
                        value: this.rawParameters.split("->")[1],
                    }
                ]
            }

            return this.rawParameters.split("|").map((item: any) => ({
                name: item.split("->")[0],
                value: item.split("->")[1]
            }));
        }


    }
</script>
}
