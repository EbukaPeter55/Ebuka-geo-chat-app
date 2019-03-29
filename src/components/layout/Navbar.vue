<template>
    <div class="navbar">
        <!--Using the materialize class for the navbar colour and brand logo-->
        <nav class="deep-purple darken-1">
        <div class="container">
        <router-link :to="{name: 'GMap'}" class = "brand-logo left">GeoEbuka</router-link>
        <ul class="right">
        <!--Linking the signup to the sign up route, using data-binding-->
         <li v-if="!user"><router-link :to="{name: 'Signup' }">Signup</router-link></li>
         <li v-if="!user"><router-link :to="{name: 'Login' }">Login</router-link></li>
         <li v-if="user"><a> {{ user.email }}</a></li>
         <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
        </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
import SignupVue from '../auth/Signup.vue';

export default {
    name: 'Navbar',
    data(){
        return {
        user : null
        }
    },
    //Once users click on sign out in the Nav bar DOM, they are redirected to the user page.
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({name: 'Login' })
            })

        }
    },
    created(){
        //Listen for a change in authentication(login or logout) state, and update user
        // let user = firebase.auth().currentUser
        firebase.auth().onAuthStateChanged((user) => {
         if(user){
             this.user = user
         } else {
             this.user = null
         }
        })
    }

}
</script>

<style>

</style>

