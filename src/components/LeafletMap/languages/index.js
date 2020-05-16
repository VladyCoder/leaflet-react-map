let en = require("./En.json");
let es = require("./Es.json");
let fr = require("./Fr.json");
let ru = require("./Ru.json");

class Language{
    constructor(type){
        this.lnType = type;
        this._initialize();
    }

    _initialize(){
        switch(this.lnType){
            case 'EN':
                this.ln = en;
                break;
            case 'ES':
                this.ln = es;
                break;
            case 'FR':
                this.ln = fr;
                break;
            case 'RU':
                this.ln = ru;
                break;
            default:
                this.ln = en;
                break;
        }
    }
    
    setLanguage(type){
        this.lnType = type;
        this._initialize();
    }

    translate(txt){
        if(!this.ln) return txt;
        if(!this.ln[txt]) return txt;
        return this.ln[txt];
    }
}

var Ln = new Language();

export var t = function(txt){
    return Ln.translate(txt);
};
export var setLanguage = function(ln){
    Ln.setLanguage(ln);
};