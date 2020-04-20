<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-combobox
                        :items="documentTypes"
                        item-text="value"
                        item-value="key"
                        v-model="fieldRuleFilter.documentTypes"
                        :clearable="true"
                        multiple
                        :search-input.sync="searchDocumentTypeValue"
                        @change="searchDocumentTypeValue = ''"
                        label="Тип документа"
                ></v-combobox>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Название поля"
                        v-model="fieldRuleFilter.fieldName"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Название проверки"
                        v-model="fieldRuleFilter.name"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="schemaTypes"
                        v-model="fieldRuleFilter.schemaTypes"
                        :clearable="true"
                        multiple
                        :search-input.sync="searchSchemaTypeValue"
                        @change="searchSchemaTypeValue = ''"
                        label="Тип схемы"
                ></v-combobox>
            </v-col>

        </v-row>
        <v-row>

            <v-col cols="3">
                <v-combobox
                        :items="valiidationModes"
                        v-model="fieldRuleFilter.validationMode"
                        :clearable="true"
                        label="Режим валидации"
                ></v-combobox>
            </v-col>
            <v-col cols="3">
                <v-combobox
                        :items="ruleSides"
                        v-model="fieldRuleFilter.ruleSides"
                        :clearable="true"
                        multiple
                        :search-input.sync="searchRuleSideValue"
                        @change="searchRuleSideValue = ''"
                        label="Сторона проверки"
                ></v-combobox>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Группа проверки"
                        v-model="fieldRuleFilter.groupName"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="formats"
                        v-model="fieldRuleFilter.formats"
                        :clearable="true"
                        multiple
                        :search-input.sync="searchFormatValue"
                        @change="searchFormatValue = ''"
                        label="Формат"
                ></v-combobox>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-text-field
                        type="text"
                        label="Описание"
                        v-model="fieldRuleFilter.description"
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-radio-group v-model="fieldRuleFilter.enabled" :mandatory="false" row>
                    <v-subheader :inset="false">Включена</v-subheader>
                    <v-radio label="Не важно" value="ALL"></v-radio>
                    <v-radio label="Да" value="true"></v-radio>
                    <v-radio label="Нет" value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="3">
                <v-select
                        :items="countsPerPage"
                        v-model="fieldRuleFilter.size"
                        label="Отображать на странице"
                ></v-select>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                        type="text"
                        label="Сообщение"
                        v-model="fieldRuleFilter.ruleCheckMessage"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="keywords"
                        v-model="fieldRuleFilter.keywords"
                        :clearable="true"
                        multiple
                        :search-input.sync="serachKeywordValue"
                        @change="serachKeywordValue = ''"
                        label="Keyword"
                ></v-combobox>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn color="success" :block="true" v-on:click="applyFilter">Применить фильтр
                </v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import ObjectUtils from "@/utils/ObjectUtils";
    import DictionaryService from "@/services/DictionaryService";
    import Debounce from "@/utils/CustomDecorators";

    @Component
    export default class FieldRuleFilter extends Vue {

        get countsPerPage() {
            return [5, 10, 20, 30, 40, 50, 75, 100];
        }


        public fieldRuleFilter = ObjectUtils.copy(this.$store.state.fieldRuleView.filter);
        public searchDocumentTypeValue = '';
        public searchSchemaTypeValue = '';
        public searchRuleSideValue = '';
        public searchFormatValue = '';
        public serachKeywordValue = '';

        @Watch("fieldRuleFilter", {deep: true, immediate: true})
        public fieldViewFilterChanged(value: string, oldValue: string) {
            this.$root.$emit('fieldRuleFilterChanged');
            this.applyFilter();
        }


        @Debounce(500)
        public applyFilter() {
            this.$store.commit('updateFieldRuleFilter', ObjectUtils.copy(this.fieldRuleFilter));
            this.$store.dispatch('reloadFieldRules');
        }

        get keywords() {
            return this.$store.state.keywords.map((item: any) =>item.code);
        }

        get ruleSides() {
            return ['ALL', 'SERVER', 'CLIENT'];
        }

        get valiidationModes() {
            return ['ERROR', 'WARNING'];
        }

        get formats() {
            return ['DATE'];
        }

        get schemaTypes() {
            return ['ANY', 'OBJECT', 'ARRAY', 'STRING', 'NUMBER', 'INTEGER', 'BOOLEAN'];
        }

        get documentTypes(): any[] {
            let documentTypes = DictionaryService.getDocumentTypes();

            return Object.keys(documentTypes).map(function (key) {
                return {key: key, value: documentTypes[key]};
            });

        }
    }
</script>
