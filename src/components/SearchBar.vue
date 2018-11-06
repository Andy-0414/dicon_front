<template>
    <div id="search">
        <h1>서비스 이름</h1>
        <div class="list">참여대상: 
            <select id="isAble">
                <option value="1">초등학생</option>
                <option value="2">중학생</option>
                <option value="3">고등학생</option>
                <option value="4">대학생</option>
                <option value="5">일반</option>
            </select>
        </div>
        <div class="list">개최기간: <input type="date" id="startDate">~<input type="date" id="endDate"></div>
        <div class="list">신청가능: 
            <select id="isAble">
                <option value="true">지금</option>
                <option value="false">지금아님</option>
            </select>
        </div>
        <div class="listBar">
            <h3>태그</h3>
            <input type="search">
        </div>
        <div class="listBar">
            <h3>검색</h3>
            <input type="search">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        props: {
        }
    }
</script>

<style scoped>
        *{
            color: #393E46;
        }
    #search{
        position: fixed;
        
        width: 400px;
        height: 100vh;

        background-color: #00ADB5;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1{
        margin: 0.5em 0;
        padding: 0;

        width: 100%;

        text-align: center;
        font-size: 4em;
    }
    .list{
        width: 80%;
        height: 50px;
        font-size: 1.5em;
    }
    .list input{
        margin: 0;
        padding: 0;
        
        width: 30%;
        height: 80%;
        font-size: 1em;
        border: 1px solid grey;
        border-radius: 5px;
    }
    .list select{
        margin: 0;
        padding: 0;

        width: 30%;
        height: 80%;
        font-size: 1em;
        border: 1px solid #393E46;
        border-radius: 5px;
    }

    .listBar{
        width: 80%;
        height: 120px;
        font-size: 1.5em;
    }
    .listBar h3{
        margin: 0;
        padding: 0.5em 0;
    }
    .listBar input{
        font-family: 'Poor Story', cursive;
        
        margin: 0;
        padding: 5px;
        
        width: 100%;
        height: 40px;
        font-size: 1em;
        border: 1px solid #393E46;
        border-radius: 5px;
    }
</style>