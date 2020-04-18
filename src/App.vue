<template>
    <v-app id="inspire">

        <v-app-bar
                app
                clipped-left
                :color="appBarColor"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Валидации документов</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>


        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>Владимир Уваров &copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import Vue from "vue";

    @Component
    export default class extends Vue {

        @Prop()
        soure!: String;

        drawer = null;

        get appBarColor() {
            if (process.env.NODE_ENV === 'development') {
                return 'red';
            }
            return 'primary';
        }

        created() {
            this.$vuetify.theme.dark = false;
            this.$store.commit("initState");
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
