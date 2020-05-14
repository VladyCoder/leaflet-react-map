
class LMapSidebar{
    constructor(id){
        this.id = id + '__lmap-sidebar';
        this._initialize(id);
    }

    _initialize(id){
        let mapEle = document.getElementById(id);
        let mapSidebar = document.createElement('div');
        mapSidebar.setAttribute('id', this.id);
        mapSidebar.classList.add('leaflet-sidebar');
        mapSidebar.classList.add('collapsed');
        mapSidebar.innerHTML = 
            `<div class="leaflet-sidebar-tabs">
                <ul role="tablist">
                    <li><a href="#home" role="tab"><i class="fa fa-bars active"></i></a></li>
                </ul>
            </div>
            <div class="leaflet-sidebar-content">
                <div class="leaflet-sidebar-pane" id="home">
                    <h1 class="leaflet-sidebar-header">
                        Map Elements
                        <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                    </h1>
                    <ul class="content">
                    </ul>
                </div>
            </div>`;
        mapEle.prepend(mapSidebar);
    }

    setData(elements){
        let _this = this;
        elements.forEach(el => {
            _this.createElement(el);
        });
    }

    createElement(data){
        let _el = document.createElement('li');

        _el.innerHTML = 
            data.name + `<ul id="`+data.id+`">
                <li>`+data.type+`</li>
                <li>`+data.status+`</li>
            </ul>`;
        
        document.querySelector("#" + this.id + " .content").append(_el);
    }

    getID(){
        return this.id;
    }
}

export default function lmapSidebar(id){
    return new LMapSidebar(id);
}
