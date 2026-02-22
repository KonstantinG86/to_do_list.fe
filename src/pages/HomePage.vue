<template>
    <div class="home-container">
        <h2>Список дел</h2>
        <p>Для редактирования или удаления задачи, выберете ее из списка</p>
        <form class="home-container__form">
            <div class="home-container__form-inputs">
                <input type="text" placeholder="Задача" v-model="task">
                <select v-model="category_id">
                    <option disabled value="">Выберите категорию</option>

                    <option 
                        v-for="category in categories" 
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.title }}
                    </option>
                </select>
            </div>
            <div class="home-container__form-buttons">
                <button type="button" @click.prevent="addTask">Добавить</button>
                <button type="button" @click.prevent="deleteTask">Удалить</button>
                <button type="button" @click.prevent="editTask">Редактировать</button>
                <router-link to="/categories" class="categories-link">Категории</router-link>
            </div>
        </form>
        <table>
            <tr class="home-container__table-header">
                <td>ID</td>
                <td>Задача</td>
                <td>Категория</td>
            </tr>
            <!-- если нажать на строку то, в инпут выводится выбранная задача и мы можем ее удалить или редактировать -->
            <tr 
            v-for="task in tasks"
            @click="isClicked(task)"
            :key="task.id"
            >
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.category_title }}</td>
            </tr>
        </table>
    </div>
</template>


<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                tasks: [],
                categories: [],
                task: '',
                id: '',
                category_id: null
            }
        },
        methods: {
            clearInputs() {
                this.isClick = false
                this.task = ''
                this.id = ''
                this.category_id = null
            },
            async getCategories() {
                const result = await axios.get('http://todolist.be/categories.php/');
                this.categories = result.data.categories
                this.clearInputs()
            },
            // Метод для получения списка задач с обнулением всех полей
            async getTasks() {
                const result = await axios.get('http://todolist.be/index.php/');
                this.tasks = result.data.list
                this.clearInputs()
            },

            // Метод для добавления задачи с обновлением через список задач
            async addTask() {
                await axios.post('http://todolist.be/index.php/', {
                    title: this.task,
                    category_id: this.category_id
                });
                this.getTasks()
                this.getCategories()
                this.clearInputs()
            },

            // Метод для удаления задачи с уточнением и обновлением через список задач
            async deleteTask() {
                if (confirm(`Вы действительно хотите удалить задачу -  ${this.task}`)) {
                    console.log("Удаляем");

                    await axios.delete('http://todolist.be/index.php/', {
                    data: {
                        id: this.id
                    }
                })
                } else {
                    console.log("Отмена");
                    return;
                };
                this.getTasks()
                this.getCategories()
                this.clearInputs()
            },

            // Метод для изменения задачи с обновлением через список задач
            async editTask() {
                await axios.put('http://todolist.be/index.php/', {
                    id: this.id,
                    title: this.task,
                    category_id: this.category_id
                });
                this.getTasks()
                this.getCategories()
                this.clearInputs()
            },

            // метод нажатия на задачу для редактирования и удаления
            isClicked(task) {
                this.id = task.id
                this.task = task.title
                this.category_id = task.category_id
            }
        },
        mounted() {
            this.getTasks();
            this.getCategories();
        }

    }
</script>


<style>
    .home-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }
    .home-container__form-buttons {
        display: flex;
        gap: 10px;
    }
    .home-container__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 600px;
        margin: 0 auto;
    }
    .home-container__form-inputs {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
    .home-container__form input, select {
        width: 0 auto;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .home-container__form button {
        padding: 10px 20px;
        width: 130px;
        border: none;
        background-color: #f2f2f2;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .home-container__form button:hover {
        background-color: #ccc;
    }
    .home-container__form button:active {
        background-color: #aaa;
    }
    .categories-link {
        text-decoration: none;
        color: #000;
        width: 130px;
        background-color: #f2f2f2;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .categories-link:hover {
        background-color: #ccc;
    }
    .categories-link:active {
        background-color: #aaa;
    }
    table {
        border-collapse: collapse;
        width: 600px;
        margin: 0 auto;
    }
    .home-container__table-header {
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
