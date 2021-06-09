<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>CRUD Pedidos</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="libs/tingle.css">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    
    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>

    <!-- 
        RTL version
    -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.rtl.min.css"/>
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.rtl.min.css"/>
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.rtl.min.css"/>
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.rtl.min.css"/>    

    <script src="libs/pagination.js"></script>
    <script src="libs/tingle.js"></script>
    <script src="libs/table2.js"></script>
    <script src="index.js"></script>
</head>
    <body>
        <div class="container-fluid">

            <!--RESULTS-->
            <div class="row mb-1 mt-2">
                <div class="col-md-8">
                    <p class="small textRight font-weight-bold m-0">Mostrando resultados del <span id="startResults">0</span> al <span id="endResults">0</span> de <span id="totalResults">0</span></p>
                </div>
                <div class="col-2">
                    <input type="text" name="searchTerm" class='form-control' id='searchTerm' placeholder='Id/Dirección/Transporte'/>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-success" id="btnAdd">Agregar</button>
                </div>
            </div>  

            <div class="row p-0 mt-2">
                <div class="col-12">
                    <div id="tblPedidos" >  </div>
                </div>
            </div>
            <!--PAGINATION-->
            <div class="row mb-3 mt-0">
                <div class="col-12 pl-0 pr-3 paginationContainer">
                    <nav aria-label="Page navigation" id="paginationContainer">
                            
                    </nav>
                </div>
            </div>
        </div>
    </body>
</html>