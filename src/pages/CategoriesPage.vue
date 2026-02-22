<template>
    <div class="categories-container">
        
        <h2>Категории</h2>
        <p>Для редактирования или удаления категории, выберете ее из списка</p>
        <form class="categories-container__form">
            <input type="text" placeholder="Категория" v-model="title">
            <div class="categories-container__form-buttons">
                <button type="button" @click="addTask">Добавить</button>
                <button type="button" @click="deleteTask">Удалить</button>
                <button type="button" @click="editTask">Редактировать</button>
                <router-link to="/"><button>Назад</button></router-link>
            </div>
        </form>
        <table>
            <tr class="categories-container__table-header">
                <td>ID</td>
                <td>Категория</td>
            </tr>
            <tr 
            v-for="category in categories"
            @click="isClicked(category)"
            :key="category.id"
            >
                <td>{{ category.id }}</td>
                <td>{{ category.title }}</td>
            </tr>
        </table>
    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                categories: [],
                title: '',
                id: '',
            }
        },
        methods: {
            // Метод для получения списка задач с обнулением всех полей
            async getCategories() {
                const result = await axios.get('http://todolist.be/categories.php/');
                this.categories = result.data.categories
                this.title = ''
                this.id = ''
                console.log(this.categories);
            },

            // Метод для добавления задачи с обновлением через список задач
            async addTask() {
                await axios.post('http://todolist.be/categories.php/', {
                    title: this.title
                });
                this.getCategories()
            },

            // Метод для удаления задачи с уточнением и обновлением через список задач
            async deleteTask() {
                if (confirm(`Вы действительно хотите удалить категорию -  ${this.task}`)) {
                    console.log("Удаляем");

                    await axios.delete('http://todolist.be/categories.php/', {
                    data: {
                        id: this.id
                    }
                })
                } else {
                    console.log("Отмена");
                    return;
                };
                this.getCategories()
            },

            // Метод для изменения задачи с обновлением через список задач
            async editTask() {
                await axios.put('http://todolist.be/categories.php/', {
                    id: this.id,
                    title: this.title
                });
                this.getCategories()
            },

            // метод нажатия на задачу для редактирования и удаления
            isClicked(category) {
                this.id = category.id
                this.title = category.title
            }
        },
        mounted() {
            this.getCategories()
        }

    }
</script>


<style scoped>
    .categories-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }
    .categories-container__form-buttons {
        display: flex;
        gap: 10px;
    }
    .categories-container__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 600px;
        margin: 0 auto;
    }
    .categories-container__form input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .categories-container__form button, router-link {
        padding: 10px 20px;
        width: 130px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #f2f2f2;
        transition: background-color 0.3s ease;
    }
    .categories-container__form button:hover, router-link:hover {
        background-color: #ccc;
    }
    .categories-container__form button:active, router-link:active {
        background-color: #aaa;
    }
    table {
        border-collapse: collapse;
        width: 600px;
        margin: 0 auto;
    }
    .categories-container__table-header {
        background-color: #f2f2f2;
        font-weight: bold;
    }
    tr {
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    tr:hover {
        background-color: #f5f5f5;
    }
    tr:active {
        background-color: #e5e5e5;
    }
    td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
</style>
