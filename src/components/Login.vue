<template>
  <div class="login">
    <!-- Modal -->
    <div class="modal fade" id="login" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                <h5 class="text-center">Login Please</h5>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                  <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" @keyup.enter="login">
                </div>
                <div class="form-group">
                  <button class="btn btn-primary" @click="login">Login</button>
                </div>
              </div>
              <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                <h5 class="text-center">Create New Account</h5>
                <div class="form-group">
                  <label for="name">First name</label>
                  <input type="text" v-model="firstName" class="form-control" id="name" placeholder="First name">
                </div>
                <div class="form-group">
                  <label for="name">Last name</label>
                  <input type="text" v-model="lastName" class="form-control" id="name" placeholder="Last name">
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
                </div>
                <div class="form-group">
                  <button class="btn btn-primary" @click="register">Signup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fb, db} from '../firebase';
import jQuery from 'jquery'

export default {
  name: "Login",
  data() {
    return {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
    };
  },
  methods: {
    login() {
      fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          jQuery('#login').modal('hide')
          this.$router.replace('/admin')
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    register() {
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
               .then((user) => {
                  jQuery('#login').modal('hide');
                  db.collection('profiles').doc(user.user.uid).set({
                    firstName: this.firstName,
                    lastName: this.lastName,
                  })
                  .then(() => {})
                  .catch((err) => {
                    console.log(err);
                  })
                  this.$router.replace('admin');
                })
                .catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  if (errorCode == 'auth/weak-password') {
                      alert('The password is too weak.');
                  } else {
                      alert(errorMessage);
                  }
                  console.log(error);
                });
    },
  }
}
</script>
