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
                    :disable-sort="true"
                    :hide-default-footer="true"
                    class="elevation-1"
            >
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
            </v-data-table>
        </v-col>
    </v-row>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DictionaryService from "@/services/DictionaryService";

    @Component
    export default class FieldRuleList extends Vue {

        @Prop({default: []})
        public fieldRules!: object[];

        @Prop({default: false})
        public loading!: boolean;

        public getDocumentName(documentTypeId: string) {
            let documentType = this.$store.getters.getDocumentType(documentTypeId);
            return DictionaryService.getDocumentName(documentType);
        }

        public getValidationModeColor(value:string) {
            if (value =='ERROR'){
                return 'red';
            }
            return 'orange';
        }
        get headers() {
            return [
                {text: 'Тип документа', value: 'documentType',},
                {text: 'Имя поля', value: 'fieldName',},
                {text: 'Название проверки', value: 'ruleName',},
                {text: 'Тип схемы', value: 'schemaType',},
                {text: 'Режим валидации', value: 'validationMode',},
                {text: 'Сторона проверки', value: 'side',},
                {text: 'Группа', value: 'group',},
                {text: 'Формат', value: 'format',},
                {text: 'Включена?', value: 'enabled',},
                {text: 'Описание', value: 'description',},
            ]
        }

        get items() {
            return this.fieldRules.map((item: any) =>
                (
                    {
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
                    }
                )
            );
        }

    }
</script>

<style>


</style>
