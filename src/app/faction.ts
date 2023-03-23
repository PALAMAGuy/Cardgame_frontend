export class Faction {

    public id: number;
    public description: string;
    public name: string;
    public image: string;

    constructor(
        id: number,
        description: string,
        name: string,
        image: string,
    ){

        this.id = id;
        this.description = description;
        this.name = name;
        this.image = image;

    };

    public toString():string{
        return this.name;
    }

}
