<template>
    <div id="list">
        <header>
            <h1>참여 가능한 대회 목록</h1>
        </header>
    </div>
</template>

<script>
    export default {
        name: 'CompetitionList',
        props: {
        }
    } 
</script>

<style scoped>
    #list{
        position: fixed;
        right: 0;

        width: calc(100% - 400px);
        height: 100vh;

        background-color: #FFF4E0;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>