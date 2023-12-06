class IBackgroundColor {

    constructor(){
        if(this.constructor === IBackgroundColor){
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    change_color(){
        throw new Error("Method 'change_color' must be implemented.");
    }



}

class BackgroundColor extends IBackgroundColor {

    constructor(){
        super();
        this.colors = {"red":"#FF0000", "green":"#00FF00", "blue":"#0000FF"};

    }

    check_color(color){
        if(!(color in this.colors)){
            throw new Error(`Color "${color}" does not exist.`)
        }
    }

    change_color(color){
       
        if(color.slice(0, 1)=='<' && color.slice(-1)=='>'){

            color = color.slice(1, color.length-1);
            try{
                this.check_color(color);
                return this.colors[color];
            }
            catch(error){
                console.error(error.message);
            }

        }


    }



}


module.exports = BackgroundColor;