<template>
    <div class="fieldRules">
        <v-expansion-panels>
            <v-expansion-panel key="fieldRuleFilter">
                <v-expansion-panel-header>Фильтр</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <FieldRuleFilter/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <FieldRuleList :fieldRules="fieldRules" :loading="loading"/>
        <template>
            <div class="text-center">
                <v-pagination
                        v-model="page"
                        :length="length"
                        :total-visible="8"
                        circle
                ></v-pagination>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import FieldRuleList from '@/components/fieldRule/FieldRuleList.vue';
    import FieldRuleFilter from '@/components/fieldRule/FieldRuleFilter.vue';

    @Component({
        components: {
            FieldRuleList,
            FieldRuleFilter,
        },
    })
    export default class FieldsRuleView extends Vue {
        public loading: boolean = false;

        public created() {
            this.$store.dispatch('reloadFieldRules');
            this.$store.dispatch("loadDocuments");
        }

        get fieldRules() {
            return this.$store.state.fieldRuleView.fieldRules;
        }

        get page() {
            return this.$store.state.fieldRuleView.currentPage;
        }

        set page(value) {
            this.$store.commit('setFieldRuleViewCurrentPage', value);
            this.$store.dispatch('reloadFieldRules');
        }

        get length() {
            return this.$store.state.fieldRuleView.totalPages;
        }

        @Watch("fieldRules")
        public fieldRulseReloaded() {
            this.loading = false;
        }

        public mounted() {
            this.$root.$on('fieldRuleFilterChanged', () => {
                this.loading = true;
            });
        }
    }
</script>
