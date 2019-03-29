<template>
<div class="signup container">
    <!--Add a submit event with prevent to avoid refresh of the web page, and execute the signup function-->
    <form @submit.prevent="signup" action="" class="card-panel">
        <h2 class="center deep-purple-text">Signup</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
        </div>
    <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
        </div>
        <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias" v-model="alias">
        </div>
        <!--Output a feedback if feedback is not null, using the v-if directive-->
        <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
          <button class="btn deep-purple">Signup</button>
      </div>
    
    </form>
</div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
name: 'Signup',
data(){
    return {
    email: null,
    password: null,
    alias: null,
    feedback: null,
    slug: null
    }
},
//Creating a slug for the alias inside the method object
methods: {
    signup(){
        if(this.alias && this.email && this.password){
        this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
        })
        /**check the collection users in the database, if doc exists, provide feeback, 
        if not provide other feedback or continue signing in using the firebase authentication
        method for email and password, we also access the user through its credentials that is given to us
        since it takes time, it is done asynchronously and 
        returns a promise which returns any error */
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
            if(doc.exists){
                this.feedback = 'This alias already exists'
            }else {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
               .then(cred => {
                   console.log(cred.user)
                   ref.set({
                       alias: this.alias,
                       geolocation: null,
                       user_id: cred.user.uid
                   })
               }).then(() => {
                   this.$router.push({ name: 'GMap' })
               })
               .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
                this.feedback = 'This alias is free to use'
            }
        })
        }else{
       this.feedback = "You must enter all fields"
        }
    }
}    
}
</script>

<style>
.signup{
max-width: 400px;
margin-top: 60px;
}
.signup h2{
    font-size: 2.4em;
}
.signup .field {
    margin-bottom: 16px;
}
</style>

