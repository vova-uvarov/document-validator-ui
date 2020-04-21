<template>
    <div>
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
        <v-container grid-list-xl>
            <v-layout wrap>
                <v-flex xs3 v-for="item in documents">
                    <v-hover>
                        <template v-slot="{ hover }">
                            <v-card
                                    :elevation="hover ? 24 : 6"
                                    class="mx-auto pa-6"
                            >
                                <v-card-title>{{getDocumentName(item.documentType)}}</v-card-title>
                                <v-card-text>
                                    <ul>
                                        <li>FiledRule: <b>{{item.count}}</b>/<span>{{item.countDisabled}}</span></li>
                                        <li>RuleSide:</li>
                                        <ul>
                                            <li>ALL: {{item.fieldRuleCounts.ALL}}</li>
                                            <li>SERVER: {{item.fieldRuleCounts.SERVER}}</li>
                                            <li>CLIENT: {{item.fieldRuleCounts.CLIENT}}</li>
                                        </ul>
                                    </ul>
                                </v-card-text>
                                <v-card-actions>

                                    <v-btn v-on:click="goToFieldRules(item.documentType)"
                                           text
                                           color="deep-purple accent-4"
                                    >
                                        Подробнее
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class DocumentsList extends Vue {

        @Prop({default: []})
        public documents!: object[];

        @Prop({default: false})
        public loading!: boolean;

        public getDocumentName(documentType: string) {
            return this.$store.getters.getDocumentName(documentType);
        }

        public goToFieldRules(documentType: string) {
            this.$store.commit('resetFilterToDocumentType', documentType);
            this.$router.push("/fieldRules");
        }
    }
</script>

<style>
    .v-card__text, .v-card__title {
        word-break: normal; /* maybe !important  */
    }

</style>
