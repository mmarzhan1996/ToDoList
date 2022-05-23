export class Item{
    public id: number;
    public title: string;
    public desc: string;
    public date: string;
    public status: string;

    constructor(id: number, title: string, desc: string, date: string, status: string){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.status = status;
    }
}
