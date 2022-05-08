"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientService_1 = require("../clientService");
const vue_property_decorator_1 = require("vue-property-decorator");
let AddUser = class AddUser extends vue_property_decorator_1.Vue {
    constructor() {
        super(...arguments);
        this.user = {
            id: null,
            firstName: '',
            lastName: '',
            mobileNumber: '',
            address: ''
        };
        this.submitted = false;
    }
    saveTutorial() {
        var data = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            mobileNumber: '639196105668',
            address: 'Hogwarts'
        };
        new clientService_1.ClientService().createUser(data).then(response => {
            this.user.id = response.user.id;
            console.log('RESPONSE ' + response);
            this.submitted = true;
        });
    }
    newTutorial() {
        this.submitted = false;
        this.user = {};
    }
};
AddUser = __decorate([
    vue_property_decorator_1.Component
], AddUser);
exports.default = AddUser;
