export default class User {
    email;
    id;
    activated;

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.activated = model.activated
    }
}
