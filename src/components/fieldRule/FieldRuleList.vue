<template>
    <v-row justify="center" align="start">
        <v-col cols="6" offset="3" v-if="loading">
            <v-progress-circular

                    :indeterminate="true"
                    :rotate="0"
                    :size="32"
                    :value="0"
                    :width="4"
                    color="light-blue"
            />
            Идет загрузка данных...
        </v-col>
        <v-col cols="12">
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="itemsPerPage"
                    :disable-sort="true"
                    :hide-default-footer="true"
                    item-key="id"
                    show-expand
                    :expanded.sync="expanded"
                    class="elevation-1"
            >

                <template v-slot:item.description="{ item }">
                    <v-tooltip bottom max-width="250px">
                        <template v-slot:activator="{ on }">
                            <span v-on="on">
                            {{item.description | truncateString(75)}}
                                </span>
                        </template>
                        <span>{{item.description}}</span>
                    </v-tooltip>

                </template>
                <template v-slot:item.enabled="{ item }">
                    <v-switch
                            v-model="item.enabled"
                            label=""
                            :disabled="true"
                    ></v-switch>
                </template>

                <template v-slot:item.validationMode="{ item }">
                    <v-chip :color="getValidationModeColor(item.validationMode)">{{item.validationMode}}</v-chip>
                </template>

                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-data-table
                                class="ruleCheckTable"
                                :headers="checkHeaders"
                                :items-per-page="100"
                                :items="getCheckData(item)"
                                :disable-sort="true"
                                :hide-default-footer="true">
                            <template v-slot:item.parameters="{ item }">
                                <Parameters :raw-parameters="item.parameters" :keyword="item.keyword"/>
                            </template>
                        </v-data-table>
                    </td>
                </template>
                <template v-slot:item.countChecks="{ item }">
                    <v-chip outlined> {{item.countChecks}}</v-chip>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DictionaryService from "@/services/DictionaryService";
    import Parameters from "@/components/fieldRule/Parameters.vue";
    @Component({
        components: {Parameters}
    })
    export default class FieldRuleList extends Vue {

        @Prop({default: []})
        public fieldRules!: object[];

        @Prop({default: false})
        public loading!: boolean;
        public expanded:any = [];


        public getDocumentName(documentTypeId: string) {
            let documentType = this.$store.getters.getDocumentType(documentTypeId);
            return this.$store.getters.getDocumentName(documentType);
        }

        public getValidationModeColor(value:string) {
            if (value =='ERROR'){
                return 'red';
            }
            return 'orange';
        }

        get itemsPerPage() {
            return this.$store.state.fieldRuleView.filter.size;
        }
        get checkHeaders() {
            return [
                {text: 'ID', value: 'id', class: "ruleCheckTable"},
                {text: 'Keyword', value: 'keyword', class: "ruleCheckTable"},
                {text: 'Параметры', value: 'parameters', class: "ruleCheckTable"},
                {text: 'Сообщение', value: 'message', class: "ruleCheckTable"},
                {text: 'conditionalRuleCheck', value: 'conditionalRuleCheck', class: "ruleCheckTable"},
            ]
        }
        public getCheckData(fieldRule:any) {
            if (!fieldRule.ruleChecks){
                return [];
            }
            return fieldRule.ruleChecks.map((item: any) =>
                (
                    {
                        id: item.id,
                        keyword: item.keyword,
                        parameters: item.parameters,
                        message: item.message,
                        conditionalRuleCheck: item.conditionalRuleCheck ? item.conditionalRuleCheck.keyword+ "("+item.conditionalRuleCheck.id+")": "",
                    }
                )
            );
        }
        get headers() {
            return [
                {text: 'Тип документа', value: 'documentType'},
                {text: 'Имя поля', value: 'fieldName'},
                {text: 'Название проверки', value: 'ruleName'},
                {text: 'Тип схемы', value: 'schemaType'},
                {text: 'Режим валидации', value: 'validationMode'},
                {text: 'Сторона проверки', value: 'side'},
                {text: 'Группа', value: 'group'},
                {text: 'Формат', value: 'format'},
                {text: 'Включена?', value: 'enabled'},
                {text: 'Описание', value: 'description'},
                {text: '', value: 'countChecks'},
                { text: '', value: 'data-table-expand' },
            ]
        }

        get items() {
            return this.fieldRules.map((item: any) =>
                (
                    {
                        id: item.id,
                        documentType: this.getDocumentName(item.documentTypeId),
                        fieldName: item.fieldName,
                        ruleName: item.name,
                        schemaType: item.schemaType,
                        validationMode: item.validationMode,
                        side: item.ruleSide,
                        group: item.groupName,
                        format: item.format,
                        enabled: item.enabled,
                        description: item.description,
                        ruleChecks: item.ruleChecks,
                        countChecks: item.ruleChecks.length,
                    }
                )
            );
        }

    }
</script>

<style>

.ruleCheckTable {
    background-color: antiquewhite;
}
</style>
