<?php
    include('main_app_class.php');
    include('libs/query_builder.php');
    include('libs/pagination-v2.php');
    $systemdb = Config::read('db.systemdb');
    $proyect = Config::read('app.WebDirName');
    $url = Config::read('app.Url');
    $mainApp = new mainApp();
    $queryBuilder = new QueryBuilder();
    $pagination = new Pagination();
    $db = $mainApp->db;

    if ($_POST["flag"] == "get_pedidos") {
        $query_builded = '';
        $array_statements = array();

        if (isset($_POST['terms'])) {

            $queries[] = " (P.direccion REGEXP CONCAT('[[:<:]]', :direccion) 
                            OR :id_usuario REGEXP '^[0-9]*$'
                            OR P.tipo_transporte REGEXP CONCAT('[[:<:]]', :tipo_transporte)) ";
            $array_statements[':id_usuario'] = $_POST['terms'];
            $array_statements[':direccion'] = $_POST['terms'];
            $array_statements[':tipo_transporte'] = $_POST['terms'];
        };

        $queries[] = " P.estado = 'activo' ";
        $query_builded = $queryBuilder->where($queries);
        
        $query_general = "SELECT P.id_pedido,fecha_pedido, fecha_almacen, fecha_envio, fecha_recibido, 
        fecha_finalizado, P.tipo_transporte, P.direccion
        FROM {$systemdb}.pedidos P {$query_builded} ORDER BY id_pedido DESC";

        $query_total = "SELECT COUNT(P.id_pedido) AS total FROM {$systemdb}.pedidos P {$query_builded}";

        $order = array();
        $n = $_POST['page'];   

        if(isset($_POST['order_by']) && $_POST['dir']){
            $by  = $_POST['order_by'];
            $dir = $_POST['dir'];
            $order = array('by'=>$by, 'dir'=>$dir);
        }  
        //echo $query_general;exit();
        $main_data = $pagination->init($query_general,$query_total,$array_statements, $order, $n ,8 );
        
        if(!$main_data['status']) {
            echo json_encode($main_data);
            exit();
        }  
        
        foreach($main_data['rows'] as $key){
            $cells = array(
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["id_pedido"]
                ),               
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["fecha_pedido"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["fecha_almacen"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["fecha_envio"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["fecha_recibido"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["fecha_finalizado"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["tipo_transporte"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                    "type" => "text",
                    "text" => $key["direccion"]
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                     "type" => "button",
                     "text" => "Editar",
                     "attributes"=>array(
                         "id"=>"btn_transaction_{$key['id_pedido']}"
                    ),
                     "cssClasses" => array("btn","btn-primary"),
                     "callback"=>array(
                         "func"=>"editPedido('{$key['id_pedido']}','remove')",
                         "events"=>array('click')
                     )
                ),
                array(
                    "rowType" =>array("isHeader"=>false),
                     "type" => "button",
                     "text" => "Eliminar",
                     "attributes"=>array(
                         "id"=>"btn_delete_{$key['id_pedido']}"
                    ),
                     "cssClasses" => array("btn","btn-danger"),
                     "callback"=>array(
                         "func"=>"deletePedido('{$key['id_pedido']}','remove')",
                         "events"=>array('click')
                     )
                 )
            );    

            //Configurando fila
            $row = array(
                'attributes'=> array('id'=>"row_{$key['id_pedido']}"),
                'cssClasses'=> array('clase1', $key['cssColor']),
                'cells' => $cells
            );
            
            $rows[] = $row; 
        };

        $main_data['rows'] = $rows;
        echo json_encode($main_data);  
        exit();
    };

    if ($_POST['flag'] == "frmAdd") {
        $doc = new DOMDocument();
        $doc->loadHTMLFile('html/frm_edit.html');

        $delete_cnt = $doc->getElementById('cntEstado');
        $delete_cnt->parentNode->removeChild($delete_cnt);

        $doc->getElementById("titulo")->textContent = "Agregar pedido";
        $doc->getElementById("btn_save")->textContent = "Guardar";
        $template['html'] = $doc->saveHTML();
        echo json_encode($template);
    };

    if ($_POST['flag'] == "actionSave") {
        $data = $_POST['data'];

        if ($_POST['action']=="add" ) {
            $response = $queryBuilder->insert($systemdb,"pedidos",$data,false);
        };

        if ($_POST['action'] == "edit") {
            $condition = array("id_pedido"=>$_POST['idPedido']);
            $response = $queryBuilder->update($systemdb,"pedidos ",$data,$condition);
        };

        echo json_encode($response);
        exit();
    };

    if ($_POST['flag'] == "frmEdit") {
        $doc = new DOMDocument();
        $doc->loadHTMLFile('html/frm_edit.html');
        //DATE_FORMAT( fecha_pedido,'%d/%m/%Y' ) AS
        try {
            $q = "SELECT id_pedido, id_usuario, fecha_pedido, fecha_almacen, fecha_envio, fecha_recibido, 
            fecha_finalizado, estado, direccion,tipo_transporte 
            FROM {$systemdb}.pedidos WHERE id_pedido = :id_pedido";
            $qp = $db->prepare($q);
            $qp->execute(array(":id_pedido"=>$_POST["id"]));
            $data = $qp->fetch(PDO::FETCH_ASSOC);
            $doc->getElementById("btn_save")->setAttribute("idpedido", $data['id_pedido']);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }

        $template["data"] = $data;
        $doc->getElementById("titulo")->textContent = "Editar pedido";
        $doc->getElementById("btn_save")->textContent = "Editar";
        $template['html'] = $doc->saveHTML();
        echo json_encode($template);
    };

    if ($_POST['flag'] == "frmDelete") {
        
        try{
            $q = "SELECT id_usuario, direccion FROM {$systemdb}.pedidos WHERE id_pedido = :id";
            $qp = $db->prepare($q);
            $qp->execute(array(':id'=>$_POST['id']));
            $data = $qp->fetch(PDO::FETCH_ASSOC);
            
        }catch(Exception $e){
            $e->getMessage();
        }

        $doc = new DOMDocument();
        $doc->loadHTMLFile('html/frm_delete.html');
        $doc->getElementById('titleModal')->textContent = "Eliminar pedido:"; 
        $doc->getElementById('message_span')->textContent = "Confirmar eliminación de pedido: {$data['id_usuario']} - {$data['direccion']}";
        $doc->getElementById('deleteBtn')->setAttribute("id_pedido", $_POST['id']);        
        $template['html'] = $doc->saveHTML();
        echo json_encode($template);
    };

    if($_POST['flag'] == 'delete'){
        
        $data['estado'] = 'inactivo';
        
        $condition = array("id_pedido"=>$_POST['id']);
        $response = $queryBuilder->update($systemdb,"pedidos",$data,$condition);
        echo json_encode($response);
        exit();
    };
?>