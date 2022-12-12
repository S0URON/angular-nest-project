import { Observable } from 'rxjs';
export const loggedInState = new Observable((observer) => {
    window.addEventListener("storage", () => {
        const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('id') ? true : false;
        observer.next(isLoggedIn);
    })
});

