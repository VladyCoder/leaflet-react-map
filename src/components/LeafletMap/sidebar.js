
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
            <div class="leaflet-sidebar-content" >
                <div class="leaflet-sidebar-pane" id="home" >
                    <h1 class="leaflet-sidebar-header" >
                        Map Elements
                        <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                    </h1>
                    <div class="leaflet-sidebar-body" >
                        <ul class="content">
                        </ul>
                    </div>
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
        _el.classList.add("e-dropdown");
        _el.setAttribute('id', data.id);

        let _item = document.createElement('div');
        _item.classList.add("e-item");
        _item.innerHTML = data.name;

        let _attr = document.createElement('ul');
        _attr.classList.add("e-attr");
        _attr.innerHTML = `<li>Type: `+data.type+`</li>
                          <li>Status: `+data.status+`</li>`;

        _el.append(_item);
        _el.append(_attr);
        document.querySelector("#" + this.id + " .content").append(_el);

        _item.addEventListener('click', function(e){
            this.parentElement.classList.toggle('open');
        });
    }

    getID(){
        return this.id;
    }
}

export default function lmapSidebar(id){
    return new LMapSidebar(id);
}
