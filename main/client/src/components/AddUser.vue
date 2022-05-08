<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="first-name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first-name"
          required
          v-model="user.firstName"
          name="first-name"
        />
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input
          class="form-control"
          id="last-name"
          required
          v-model="user.firstName"
          name="last-name"
        />
      </div>
      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ClientService } from '../clientService';

  export default defineComponent({
    data() {
      return { user: emptyUser(), submitted: false };
    },
    methods: {
      saveUser() {
        var data = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          mobileNumber: '639196105668',
          address: 'Hogwarts'
        };

        new ClientService().createUser(data).then(response => {
          this.user.id = response.user.id;
          console.log('RESPONSE ' + response);
          this.submitted = true;
        })
      },
      newUser() {
        this.submitted = false;
        // this.user = {} as NewUser;
      }
    }
  });

  function emptyUser(): NewUser {
    return {
      id: null,
      firstName: '',
      lastName: '',
      mobileNumber: '',
      address: ''
    };
  }

  interface NewUser {
    id?: number,
    firstName: string,
    lastName: string,
    mobileNumber: string,
    address: string,
  }

</script>