<?php
include 'sqlite_services.php';
if (isset($_POST["project"])) {
    (new Sqlite)->load_lit($_POST["project"]);
}
