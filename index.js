let table = new Table();
let dir = 'ASC';
let withOutResults = {
    'cells': [{
        'rowType': {
            'isHeader': false,
        },
        'type': 'text',
        'text': 'No se encuentrar resultados',
        'attributes': {
            'colspan': '8',
        },
    }]
};

window.addEventListener('load', function() {
    resetFilter();
    buildPedidos();
    loadTblPedidos(1);
    addPedido();
    searchTerm();
    //pickerForFilter();
});

function resetFilter() {
    
    let viewData = JSON.parse(sessionStorage.getItem("items"));
    console.log(viewData)
    if (viewData && viewData.hasOwnProperty('inputs')) {
        console.log(viewData);
        delete viewData.inputs;
        sessionStorage.setItem("items", JSON.stringify(viewData));
    }
}

function searchTerm() {
    const searchTermItem = document.getElementById("searchTerm");
    searchTermItem.addEventListener('keyup', (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (searchTermItem.value.length > 0) {
            if (event.keyCode && event.which === 13) {
                barSearchItems(searchTermItem.value);
            }
        }
        else {
            let viewData = JSON.parse(sessionStorage.getItem("items"));
            if (viewData.hasOwnProperty('inputs')) {
                console.log("delete")
                delete viewData['inputs'];
                sessionStorage.setItem("items", JSON.stringify(viewData));
            }
            loadTblPedidos(1);
        }
    });
};

function barSearchItems(text) {
    if (text && text != '') {
        var data = { 
            inputs: 
                {searchTerm:text}
        };
    }
      sessionStorage.setItem("items",JSON.stringify(data)); //aquí se guardan los datos serializados
      var items = JSON.parse(sessionStorage.getItem("items"));

    /*if (items.hasOwnProperty('inputs')) {
        console.log("delete")
        delete items['inputs'];
    }*/

      if (items.hasOwnProperty('inputs')) {
        loadTblPedidos(1);
      }
      //console.log(items.inputs); //aquí estarian tus inputs
      
}

function buildPedidos() {

    let headerRow = {
        'attributes': {
            'id': 'headerTable'
        },
        'cssClasses': ['header', 'header2'],
        'cells': [{
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'skuH'
                }
            },
            'type': 'text',
            'text': 'Id Usuario'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'divisionH'
                }
            },
            'type': 'text',
            'text': 'Fecha de pedido'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'itemH'
                }
            },
            'type': 'text',
            'text': 'Fecha de almacen'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'descriptionH'
                }
            },
            'type': 'text',
            'text': 'Fecha de envio'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'unitH'
                }
            },
            'type': 'text',
            'text': 'Fecha recibido'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'quantityH'
                }
            },
            'type': 'text',
            'text': 'Fecha fin'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'retiroH'
                }
            },
            'type': 'text',
            'text': 'Transporte'
        }, {
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'retiroH'
                }
            },
            'type': 'text',
            'text': 'Dirección'
        },{
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'btnEditar'
                }
            },
            'type': 'text',
            'text': 'Editar'
        },{
            'rowType': {
                'isHeader': true,
                'attributes': {
                    'id': 'btnEliminar'
                }
            },
            'type': 'text',
            'text': 'Eliminar'
        }]
    };

    let withOutResults = {
        'cells': [{
            'rowType': {
                'isHeader': false,
            },
            'type': 'text',
            'text': 'Sin pedidos agregados',
            'attributes': {
                'colspan': '9',
            },
        }]
    };

    let configTable = {
        'idContainer': 'tblPedidos',
        'idTBody': 'bodyTable',
        'attributes': {
            'id': 'tblPedidosId'
        },
        'cssClasses': ['table'],
        'headers': headerRow,
        'withOutResults': withOutResults
    }

    table.createTable(configTable, null);
};

function loadTblPedidos(i) {
    var fData = new FormData();
    var xhttp = new XMLHttpRequest();
    fData.append("flag", "get_pedidos");
    fData.append("page",i);

    let viewData = JSON.parse(sessionStorage.getItem("items"));

    if (viewData) {
        if (viewData.hasOwnProperty('inputs')) {
            var textValue = viewData.inputs.searchTerm;
            fData.append("terms", textValue);
        }
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            table.loadingRows(response.rows, "bodyTable", withOutResults);
            if (response.pagination_data) {
                response.pagination_data.callback = loadTblPedidos;
                let pagination = new Pagination(response.pagination_data);
                pagination.init();
            } else {
                document.getElementById('startResults').textContent = 0;
                document.getElementById('endResults').textContent = 0;
                document.getElementById('totalResults').textContent = 0;
                while (document.getElementById('paginationContainer').firstChild) document.getElementById('paginationContainer').removeChild(document.getElementById('paginationContainer').firstChild);
            }
        }
    };
    xhttp.open("POST", "index_ajax.php");
    xhttp.send(fData);
}

function addPedido() {
    document.getElementById("btnAdd").addEventListener("click", function(){
        var fData = new FormData();
        var xhttp = new XMLHttpRequest();
        fData.append("flag", "frmAdd");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.response);
                var range = document.createRange();
                var fragment = range.createContextualFragment(response.html);
                let isOpen = document.getElementsByClassName("tingle-modal")[0];
                if (!isOpen) {
                    var modal = new tingle.modal({
                        footer: false,
                        stickyFooter: false,
                        closeMethods: ['button', 'escape'],
                        closeLabel: "Close",
                        cssClass: ['custom-class-1', 'custom-class-2'],
                        onOpen: function() {
                            document.getElementById("btn_save").addEventListener("click", function () {
                                savePedido(modal); 
                            });
                        },
                        onClose: function() {
                            modal.destroy();
                        }
                    });
                    modal.setContent(fragment);
                    modal.open();
                }
            }
        };
        xhttp.open("POST", "index_ajax.php");
        xhttp.send(fData);
    });
};

function editPedido(id) {
    var fData = new FormData();
    var xhttp = new XMLHttpRequest();
    fData.append("flag", "frmEdit");
    fData.append("id",id);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            var range = document.createRange();
            var fragment = range.createContextualFragment(response.html);
            let isOpen = document.getElementsByClassName("tingle-modal")[0];
            if (!isOpen) {
                var modal = new tingle.modal({
                    footer: false,
                    stickyFooter: false,
                    closeMethods: ['button', 'escape'],
                    closeLabel: "Close",
                    cssClass: ['custom-class-1', 'custom-class-2'],
                    onOpen: function() {
                        //console.log(response.data);
                        document.getElementById("frm|direccion").value =response.data.direccion;
                        document.getElementById("frm|id_usuario").value =response.data.id_usuario;
                        document.getElementById("frm|fecha_pedido").value =response.data.fecha_pedido;
                        document.getElementById('frm|fecha_almacen').value = response.data.fecha_almacen;
                        document.getElementById('frm|fecha_envio').value = response.data.fecha_envio;
                        document.getElementById('frm|fecha_recibido').value = response.data.fecha_recibido;
                        document.getElementById('frm|fecha_finalizado').value = response.data.fecha_finalizado;
                        document.getElementById('frm|estado').value = response.data.estado;
                        document.getElementById("frm|tipo_transporte").value =response.data.tipo_transporte;
                        var idPedido = document.getElementById("btn_save").getAttribute("idpedido"); 
                        document.getElementById("btn_save").addEventListener("click", function () {
                            updatePedido(modal, idPedido);
                        });

                    },
                    onClose: function() {
                        modal.destroy();
                    }
                });
                modal.setContent(fragment);
                modal.open();
            }
        }
    };
    xhttp.open("POST", "index_ajax.php");
    xhttp.send(fData);
}

function deletePedido(id) {
    var fData = new FormData();
    var xhttp = new XMLHttpRequest();
    fData.append("flag", "frmDelete");
    fData.append("id",id);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            var range = document.createRange();
            var fragment = range.createContextualFragment(response.html);
            let isOpen = document.getElementsByClassName("tingle-modal")[0];
            if (!isOpen) {
                var modal = new tingle.modal({
                    footer: false,
                    stickyFooter: false,
                    closeMethods: ['button', 'escape'],
                    closeLabel: "Close",
                    cssClass: ['custom-class-1', 'custom-class-2'],
                    onOpen: function() {
                        var idPedido = document.getElementById("deleteBtn").getAttribute("id_pedido"); 
                        eliminarPedido(modal, idPedido);
                    },
                    onClose: function() {
                        modal.destroy();
                    }
                });
                modal.setContent(fragment);
                modal.open();
            }
        }
    };
    xhttp.open("POST", "index_ajax.php");
    xhttp.send(fData);
};

function savePedido(modal) {
    var fData = new FormData();
    var submitx = new XMLHttpRequest();
    fData.append("flag", "actionSave");
    fData.append("action", "add");
    var elTagName = ["INPUT", "SELECT", "TEXTAREA"];
    var eLs = document.getElementsByClassName("editor");
    var eLen = eLs.length;
    while (eLen--) {
         var eL = eLs[eLen];
         var elValue = false;
         if (elTagName.indexOf(eL.tagName) >= 0) {
              var elType = eL.getAttribute("TYPE");
              if (elType && (elType.toUpperCase() == "RADIO" || elType.toUpperCase() == "CHECKBOX")) {
                   // if (eL.checked) elValue = eL.value;
                   elValue = eL.value;
              }
              else elValue = eL.value;
              //append here to get the elements with same name ex. varname[]
              fData.append(eL.name, elValue);
         }
    }

    submitx.onreadystatechange = function() {
        if (submitx.readyState == 4 && submitx.status == 200) {
            var response = JSON.parse(this.response);
            if(response.status == true){
                alertify.success('Pedido registrado!!!.'); 
                modal.close();
                loadTblPedidos(1);
            }
        }
   }

    submitx.open("POST", "index_ajax.php", true);
    submitx.send(fData);
};

function eliminarPedido(modal, id) {
    var fData = new FormData();
    var submitx = new XMLHttpRequest();
    document.getElementById("deleteBtn").addEventListener("click", function () {
        fData.append("flag", "delete");
        fData.append("id", id);

        submitx.onreadystatechange = function() {
            if (submitx.readyState == 4 && submitx.status == 200) {
                var response = JSON.parse(this.response);
                if(response.status == true){
                    alertify.success('Pedido editado!!!.'); 
                    modal.close();
                    loadTblPedidos(1);
                }
            }
       }
    
        submitx.open("POST", "index_ajax.php", true);
        submitx.send(fData);

    });

    document.getElementById('cancelBtn').addEventListener('click', function() {
        modal.close();
    });
};

function updatePedido(modal, idPedido) {
    var fData = new FormData();
    var submitx = new XMLHttpRequest();
    fData.append("flag", "actionSave");
    fData.append("action", "edit");
    fData.append("idPedido", idPedido);
    var elTagName = ["INPUT", "SELECT", "TEXTAREA"];
    var eLs = document.getElementsByClassName("editor");
    var eLen = eLs.length;
    while (eLen--) {
         var eL = eLs[eLen];
         var elValue = false;
         if (elTagName.indexOf(eL.tagName) >= 0) {
              var elType = eL.getAttribute("TYPE");
              if (elType && (elType.toUpperCase() == "RADIO" || elType.toUpperCase() == "CHECKBOX")) {
                   // if (eL.checked) elValue = eL.value;
                   elValue = eL.value;
              }
              else elValue = eL.value;
              //append here to get the elements with same name ex. varname[]
              fData.append(eL.name, elValue);
         }
    }

    submitx.onreadystatechange = function() {
        if (submitx.readyState == 4 && submitx.status == 200) {
            var response = JSON.parse(this.response);
            if(response.status == true){
                alertify.success('Pedido editado!!!.'); 
                modal.close();
                loadTblPedidos(1);
            }
        }
   }

    submitx.open("POST", "index_ajax.php", true);
    submitx.send(fData);
}