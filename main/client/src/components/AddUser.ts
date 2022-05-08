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
      this.user = {} as NewUser;
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