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
            <v-simple-table :dense="true">
                <thead>
                <tr>

                    <th class="text-left">Тип документа</th>
                    <th class="text-left">Имя поля</th>
                    <th class="text-left">Название проверки</th>
                    <th class="text-left">Тип схемы</th>
                    <th class="text-left">Режим валидации</th>
                    <th class="text-left">Сторона проверки</th>
                    <th class="text-left">Группа</th>
                    <th class="text-left">Формат</th>
                    <th class="text-left">Включена?</th>
                    <th class="text-left">Описание</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in fieldRules" >
<!--                    todo-->
                    <td>{{ item.documentTypeId }}</td>
                    <td>{{ item.fieldName}}</td>
                    <td>{{ item.name}}</td>
                    <td>{{ item.schemaType}}</td>
                    <td>{{ item.validationMode}}</td>
                    <td>{{ item.ruleSide}}</td>
                    <td>{{ item.groupName}}</td>
                    <td>{{ item.format }}</td>
                    <td>
                        <v-switch
                                v-model="item.enabled"
                                label=""
                                :disabled="true"
                        ></v-switch>
                    </td>
                    <td>{{ item.description|truncateString}}</td>
                </tr>

                </tbody>
            </v-simple-table>
        </v-col>

    </v-row>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class FieldRuleList extends Vue {

        @Prop({default: []})
        public fieldRules!: object[];

        @Prop({default: false})
        public loading!: boolean;

    }
</script>

<style>


</style>
