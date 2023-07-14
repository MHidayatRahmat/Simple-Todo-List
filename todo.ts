
class Todo{
    key: string;
    text:string;
    complete: boolean
    

    constructor(todoText: string){
        this.text=todoText;
        this.key= new Date().toISOString();
        this.complete= false
    }
}
export default Todo;
export {};