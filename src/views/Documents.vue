<template>
    <div class="documents">
            <DocumentsList :documents="documents" :loading="loading"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import DocumentsList from '@/components/document/DocumentsList.vue';

    @Component({
        components: {
            DocumentsList,
        },
    })
    export default class DocumentsView extends Vue {
        public loading: boolean = false;

        public created() {
            this.$store.dispatch("loadDocuments");

        }

        get documents() {
            return this.$store.state.documents
        }

        @Watch("documents")
        public documentsLoading() {
            this.loading = false;
        }
    }
</script>
