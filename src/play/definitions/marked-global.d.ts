import module = require('marked');

declare global {
    interface Window {
        marked: typeof module
    }
}