<template>
    <div>
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
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                        :headers="headers"
                        :items="items"
                        :items-per-page="30"
                        :disable-sort="true"
                        :hide-default-footer="true"
                        item-key="id"
                        class="elevation-1"
                >
                    <template v-slot:item.documentType="{ item }">
                        <v-chip outlined v-on:click="goToFieldRules(item.documentTypeRaw, true, null)">
                            {{item.documentType}}
                        </v-chip>
                    </template>
                    <template v-slot:item.fieldsRuleON="{ item }">
                        <v-chip outlined color="green" v-on:click="goToFieldRules(item.documentTypeRaw, true, null)">
                            {{item.fieldsRuleON}}
                        </v-chip>
                    </template>
                    <template v-slot:item.fieldsRuleOFF="{ item }">
                        <v-chip outlined color="red" v-on:click="goToFieldRules(item.documentTypeRaw, false, null)">
                            {{item.fieldsRuleOFF}}</v-chip>
                    </template>
                    <template v-slot:item.ruleSideAll="{ item }">
                        <v-chip outlined v-on:click="goToFieldRules(item.documentTypeRaw, null, 'ALL')">
                            {{item.ruleSideAll}}</v-chip>
                    </template>

                    <template v-slot:item.ruleSideServer="{ item }">
                        <v-chip outlined v-on:click="goToFieldRules(item.documentTypeRaw, null, 'SERVER')">
                            {{item.ruleSideServer}}</v-chip>
                    </template>

                    <template v-slot:item.ruleSideClient="{ item }">
                        <v-chip outlined v-on:click="goToFieldRules(item.documentTypeRaw, null, 'SERVER')">
                            {{item.ruleSideClient|number}}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import DictionaryService from "@/services/DictionaryService";
    import ObjectUtils from "@/utils/ObjectUtils";

    @Component
    export default class DocumentsList extends Vue {

        @Prop({default: []})
        public documents!: object[];

        @Prop({default: false})
        public loading!: boolean;

        public goToFieldRules(documentType: string, isEnabled: boolean, ruleSide: string) {
            this.$store.commit('resetFilterFieldRuleFilter');
            let newFilter: any = ObjectUtils.copy(this.$store.state.fieldRuleView.filter);
            newFilter.documentTypes = [{
                key: documentType,
                value: DictionaryService.getDocumentName(documentType)
            }];
            newFilter.enabled = isEnabled;
            newFilter.ruleSides = [ruleSide];

            this.$store.commit('updateFieldRuleFilter', newFilter);
            this.$router.push("/fieldRules");
        }

        get items() {
            return this.documents.map((item: any) =>
                (
                    {
                        id: item.documentRuleId,
                        documentTypeRaw: item.documentType,
                        documentType: DictionaryService.getDocumentName(item.documentType),
                        fieldsRuleON: item.count,
                        fieldsRuleOFF: item.countDisabled,
                        ruleSideAll: item.fieldRuleCounts.ALL,
                        ruleSideServer: item.fieldRuleCounts.SERVER,
                        ruleSideClient: item.fieldRuleCounts.CLIENT,
                    }
                )
            );
        }

        get headers() {
            return [
                {text: 'Тип документа', value: 'documentType'},
                {text: 'FieldRules ON', value: 'fieldsRuleON'},
                {text: 'FieldRules OFF', value: 'fieldsRuleOFF'},
                {text: 'RuleSide ALL', value: 'ruleSideAll'},
                {text: 'RuleSide SERVER', value: 'ruleSideServer'},
                {text: 'RuleSide CLIENT', value: 'ruleSideClient'},
            ]
        }
    }
</script>

<style>
    .v-card__text, .v-card__title {
        word-break: normal; /* maybe !important  */
    }

</style>
