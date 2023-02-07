import { Controller } from '@hotwired/stimulus';

/*
 * This is an example Stimulus controllers!
 *
 * Any element with a data-controllers="hello" attribute will cause
 * this controllers to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
export default class extends Controller {
    connect() {
        this.element.textContent = 'Hello Stimulus! Edit me in assets/controllers/hello_controller.js';
    }
}
