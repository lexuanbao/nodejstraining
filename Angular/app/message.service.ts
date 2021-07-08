import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MessageService{
    messages: string[] = [];
    errors: string[] = [];

    addMsg(msg: string){
        this.messages.push(msg);
    }

    addError(error: string){
        this.errors.push(error);
    }

    addErrorResponse(e){
        e.error.forEach(element => {
            this.errors.push(element.msg);
        });
    }
}

