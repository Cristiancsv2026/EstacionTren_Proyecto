<?php
$servidor = "localhost";
$usuario = "root";
$password = "";
$baseDatos = "viajes_japon";

$conexion = new mysqli($servidor, $usuario, $password, $baseDatos);

if ($conexion->connect_error) {
    die("Error de conexión");
}

$nombre = $_POST['nombre'] ?? '';
$experiencia = $_POST['experiencia'] ?? '';
$puntualidad = $_POST['puntualidad'] ?? '';
$servicios = isset($_POST['servicios']) ? implode(', ', $_POST['servicios']) : '';
$atencion = $_POST['atencion'] ?? '';
$recomendar = $_POST['recomendar'] ?? '';
$comentarios = $_POST['comentarios'] ?? '';

$sql = "INSERT INTO evaluaciones (nombre, experiencia, puntualidad, servicios, atencion, recomendar, comentarios) VALUES ('$nombre', '$experiencia', '$puntualidad', '$servicios', '$atencion', '$recomendar', '$comentarios')";

if ($conexion->query($sql) === TRUE) {
    echo "success";
} else {
    echo "error";
}

$conexion->close();
?>