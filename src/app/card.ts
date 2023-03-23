export class Card {

    public id: number;
	public name: string;
    public description: string;
	public image: string;
	public power: number;

    constructor(
        id: number,
        name: string,
        description: string,
        image: string,
        power: number,
    ){

        this.id = id;
        this.description = description;
        this.name = name;
        this.image = image;
        this.power = power;

    };

    public toString():string{
        return this.name;
    }
	

}
