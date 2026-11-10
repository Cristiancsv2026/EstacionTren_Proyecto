<?php
session_start();

$metodo = $_SERVER['REQUEST_METHOD'] ?? '';

if ($metodo === 'POST') {
    $user_ingresado = $_POST['usuario'] ?? '';
    $pass_ingresado = $_POST['password'] ?? '';

    if ($user_ingresado === 'admin' && $pass_ingresado === '2026') {
        $_SESSION['admin'] = true;
    } else {
        echo "<script>alert('Credenciales incorrectas'); window.location.href='login.html';</script>";
        exit();
    }
}

if (!isset($_SESSION['admin'])) {
    header("Location: login.html");
    exit();
}

$servidor = "localhost";
$usuario = "root";
$password = "";
$baseDatos = "viajes_japon";

$conexion = new mysqli($servidor, $usuario, $password, $baseDatos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$sql = "SELECT id, nombre, experiencia, puntualidad, servicios, atencion, recomendar, comentarios, fecha FROM evaluaciones ORDER BY id DESC";
$resultado = $conexion->query($sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Estación de Tren Japón</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

    <header class="header">
        <div class="menu container">
            <a  class="logo">Estación Tren Japón</a>
            <input type="checkbox" id="menu">
            <label for="menu">
                <img src="img/menu.png" class="menu-icono" alt="Menú">
            </label>
            <nav class="navbar">
                <ul>

                    <li><a href="cerrar.php">Cerrar Sesión</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-content container">
            <h1>Panel Admin</h1>
            <p>Control centralizado de opiniones y registros de pasajeros.</p>
        </div>
    </header>

    <main class="login-card admin-card">
        <div class="admin-header">
            <h2>Evaluaciones de Pasajeros</h2>
        </div>

        <div class="table-responsive">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Experiencia</th>
                        <th>Puntualidad</th>
                        <th>Servicios</th>
                        <th>Atención</th>
                        <th>Recomendar</th>
                        <th>Comentarios</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
if ($resultado && $resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "<tr>";
        echo "<td data-label='ID'>" . htmlspecialchars($fila['id']) . "</td>";
        echo "<td data-label='Nombre'>" . htmlspecialchars($fila['nombre']) . "</td>";
        echo "<td data-label='Experiencia'>" . htmlspecialchars($fila['experiencia']) . "</td>";
        echo "<td data-label='Puntualidad'>" . htmlspecialchars($fila['puntualidad']) . "</td>";
        echo "<td data-label='Servicios'>" . htmlspecialchars($fila['servicios']) . "</td>";
        echo "<td data-label='Atención'>" . htmlspecialchars($fila['atencion']) . "/5</td>";
        echo "<td data-label='Recomendar'>" . htmlspecialchars($fila['recomendar']) . "</td>";
        echo "<td data-label='Comentarios'>" . htmlspecialchars($fila['comentarios']) . "</td>";
        echo "<td data-label='Fecha'>" . htmlspecialchars($fila['fecha']) . "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='9' style='text-align:center; padding: 25px;'>No hay evaluaciones registradas todavía.</td></tr>";
}
?>
                </tbody>
            </table>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-content container">
            <div class="link">
                <h3>Estación Tren Japón</h3>
                <ul>
                    <li>Panel de Administración y Control</li>
                    <li>Sistema de Gestión de Usuarios</li>
                </ul>
            </div>
        </div>
    </footer>

</body>
</html>
<?php
$conexion->close();
?>