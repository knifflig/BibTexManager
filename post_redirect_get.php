<?php
echo "<script>console.log('Welcome to PHP')</script>";

include 'php/sqlite_services.php';
echo "<script type='text/javascript' src='js/BibTexManager_services.js'></script>";

$url = "./index.html";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "<script>console.log('Method is POST')</script>";

    if (isset($_POST["project"])) {

        $project = $_POST["project"];
        echo "<script>console.log('Project is $project')</script>";

        (new Sqlite)->open_db($project);

        echo "<script>document.cookie = 'project=$project'</script>";
        echo "<script>console.log('Cookie '+getCookie('project')+' is set')</script>";

        if (isset($_POST["type"])) {
            $type = $_POST['type'];
            (new Sqlite)->entry_lit($project, $_POST);
            echo "<script>console.log('New $type have been added')</script>";
        } else {
            (new Sqlite)->open_db($project);
            echo "<script>console.log('Database is $project')</script>";
        }

        /* load table here */
        echo "<script>
                    loadTable()
                    console.log('Table have been loaded to cookie');
                </script>";
        /**/
        /* Leave to Project */
        echo "<script>window.location.replace('$url'+'?project='+getCookie('project'));</script>";
        /**/
        }
    else if (isset($_POST["doi_input"])) {
            $doi = $_POST["doi_input"];
            echo "<script>console.log('DOI is $doi')</script>";
            echo "<script>console.log('Leave to '+getCookie('project')+' & search for $doi')</script>";

        /* Leave to Project with doi*/
            echo "<script>window.location.replace('$url'+'?project='+getCookie('project')+'&doi='+'$doi')</script>";
        /**/

        }
        else {
            echo "<script>console.log('Unknown POST value => leave to Index')</script>";
            echo "<script>window.location.replace('$url'));</script>";
        }
    }
    else {
        echo "<script>console.log('No POST value found => leave to Index')</script>";
        echo "<script>window.location.replace('$url'));</script>";
    }

