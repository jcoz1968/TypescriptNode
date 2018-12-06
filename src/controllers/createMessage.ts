export default class Messenger {
    port: number;

    constuctor(port) {
        this.port = port;
    }

    messagePrint() {
        return `Node and express is running on port: ${this.port}`;
    }
};