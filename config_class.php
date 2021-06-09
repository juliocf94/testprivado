<?php
//namespace mainApp\mainLib;
ini_set('display_errors', 0);

$__config = 'Config';
Config::write('db.host','localhost');
Config::write('db.user','root');
Config::write('db.pass','');
Config::write('db.dbname',false);
Config::write('db.dbport',false);
Config::write('db.systemdb','testdsg2021');
//Config::write('db.systemdb','app_main');

class Config {
    static $confArray;
    
    public static function read($name){
        if(array_key_exists($name,self::$confArray))return self::$confArray[$name];
        else return false;
    }
    public static function write($name, $value){
        self::$confArray[$name]=$value;
    }
    public static function show(){
        return self::$confArray;
    }
}
?>
