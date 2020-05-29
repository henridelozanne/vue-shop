<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <div class="user-pic">
              <img class="img-responsive img-rounded" src="/img/avatar.png" alt="User picture">
            </div>
            <div class="user-info">
              <span class="user-name">{{firstName}}
                <strong>{{lastName}}</strong>
              </span>
              <span class="user-role"> {{email}} </span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <div class="sidebar-brand">
            <router-link to="/admin">
              <span>{{companyName}}</span>
            </router-link>
          </div>
          <div class="sidebar-menu">
            <ul>
              <li>
                <router-link to="/admin">
                  <i class="fa fa-home"></i>
                  <span>Overview</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/products">
                  <i class="fa fa-tags"></i>
                  <span>Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                  <a href="#" @click="logout()">
                      <i class="fa fa-power-off"></i>
                      <span>Logout</span>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="page-content">
          <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { fb, db } from '../firebase';

export default {
  name: "admin",
  data(){
    return{
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      companyName: 'Vue Shop',
    };
  },
  methods:{
    logout() {
      fb.auth().signOut()
        .then(() => {
          this.$router.replace('/');
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  created() {
    const user = fb.auth().currentUser;
    this.email = user.email;
    db.collection('profiles').doc(user.uid)
                  .get()
                  .then(doc => {
                    this.firstName = doc.data().firstName;
                    this.lastName = doc.data().lastName;
                  })
                  .catch((err) => {
                    console.log(err);
                  })
  },
};
</script>

<style lang="scss">
.sidebar-brand {
  margin-top: 65px;
  text-align: left;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin: 50px 0;
  border-color: #464646;
  border-top: 1px solid #464646;
  border-bottom: 1px solid #464646;

  .user-pic {
    align-self: flex-start;
  }

  .user-info {
    text-align: left;
    margin-left: 20px;
  }
}
</style>