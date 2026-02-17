<template>
    <div class="home-container">
        <h2>Список дел</h2>
        <p>Для редактирования или удаления задачи, выберете ее из списка</p>
        <form class="home-container__form">
            <input type="text" placeholder="Задача" v-model="task">
            <div class="home-container__form-buttons">
                <!-- <button type="button" @click="getTasks">Обновить список</button> -->
                <button type="button" @click="addTask">Добавить</button>
                <button type="button" @click="deleteTask">Удалить</button>
                <button type="button" @click="editTask">Редактировать</button>
            </div>
        </form>
        <table>
            <tr class="home-container__table-header">
                <td>ID</td>
                <td>Задача</td>
            </tr>
            <!-- если нажать на строку то, в инпут выводится выбранная задача и мы можем ее удалить или редактировать -->
            <tr 
            v-for="task in tasks"
            @click="isClicked(task)"
            :key="task.id"
            >
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
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
                task: '',
                id: '',
                isClick: false
            }
        },
        methods: {
            // Метод для получения списка задач с обнулением всех полей
            async getTasks() {
                const result = await axios.get('http://todolist.be/index.php/');
                this.tasks = result.data.list
                this.isClick = false
                this.task = ''
                this.id = ''
                console.log(this.tasks);
            },

            // Метод для добавления задачи с обновлением через список задач
            async addTask() {
                await axios.post('http://todolist.be/index.php/', {
                    title: this.task
                });
                this.getTasks()
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
            },

            // Метод для изменения задачи с обновлением через список задач
            async editTask() {
                await axios.put('http://todolist.be/index.php/', {
                    id: this.id,
                    title: this.task
                });
                this.getTasks()
            },

            // метод нажатия на задачу для редактирования и удаления
            isClicked(task) {
                this.isClick = true
                this.id = task.id
                this.task = task.title
            }
        },
        mounted() {
            this.getTasks()
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
    .home-container__form input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .home-container__form button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .home-container__form button:hover {
        background-color: #ccc;
    }
    .home-container__form button:active {
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
