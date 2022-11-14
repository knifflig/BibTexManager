

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function showElement(id, style) {
    document.getElementById(id).style.display = style
}

function changeElement(id, new_text="") {
    document.getElementById(id).innerHTML = new_text;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

async function loadTable() {
    try {
        let project = getCookie('project')
        let table = await fetch('php/load_db.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            mode: 'cors',
            body: "project=" + project
        })

        console.log('status code: ', table.status);
        if (!table.ok) {
            console.log(table);
            throw new Error(`Error! status: ${table.status}`);
        }

        table = await table.text()
        table = encodeURI('table='+table)
        document.cookie = table
        console.log("Cookie: "+getCookie("table"));
    }
    catch (err) {
        console.log(err);
    }
}

async function openForm() {
    try {
        let response = await fetch("Form.html")
        let file = await response.text()
        changeElement("form_popup", file)
        document.getElementById("proj_name_form").value = findGetParameter("project");
        showElement("form_popup", "inline-block")
    } catch (err) {
        console.log(err);
    }
}

function closeForm() {
    hideElement("form_popup")
    if (findGetParameter("doi") !== null) {
        window.location.replace('index.html?project='+getCookie('project'))
    }
}


function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if not found
    return null;
}


async function request(url) {
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8',
            },
        });
        console.log('status code: ', response.status);
        if (!response.ok) {
            console.log(response);
            alert("DOI not found");
            throw new Error(`Error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        change_values(data)
    }
    catch (err) {
        console.log(err);
    }
}

function authors(obj) {
    let authors = obj["author"]
    if (authors.length === 1) {
        return authors[0]["given"] + " " + authors[0]["family"]
    }
    else if (authors.length === 2) {
        return authors[0]["given"] + " " + authors[0]["family"] + " and " + authors[1]["given"] + " " + authors[1]["family"]
    }
    else if (authors.length > 2) {
        return authors[0]["given"] + " " + authors[0]["family"] + " et al."
    }
}

function change_values(obj) {
    if (obj.hasOwnProperty("author") && obj["author"].length !== 0) {
        document.getElementById("author").value = authors(obj);
    }
    if (obj.hasOwnProperty("title") && obj["title"].length !== 0) {
        document.getElementById("title").value = obj["title"];
    }
    if (obj.hasOwnProperty("published") && obj["published"].length !== 0) {
        document.getElementById("year").value = obj["published"]["date-parts"][0][0];
        document.getElementById("month").value = obj["published"]["date-parts"][0][1];
    }
    if (obj.hasOwnProperty("container-title") && obj["container-title"].length !== 0) {
        document.getElementById("journal").value = obj["container-title"];
    }
    if (obj.hasOwnProperty("volume") && obj["volume"].length !== 0) {
        document.getElementById("volume").value = obj["volume"];
    }
    if (obj.hasOwnProperty("issue") && obj["issue"].length !== 0) {
        document.getElementById("issue").value = obj["issue"];
    }
    if (obj.hasOwnProperty("publisher") && obj["publisher"].length !== 0) {
        document.getElementById("publisher").value = obj["publisher"];
    }
    // if (obj.hasOwnProperty("chapter") && obj["chapter"].length !== 0) {
    //         document.getElementById("chapter").value = obj["chapter"];
    //     }
    if (obj.hasOwnProperty("page") && obj["page"].length !== 0) {
        document.getElementById("pages").value = obj["page"];
    }
    // if (obj.hasOwnProperty("edition") && obj["edition"].length !== 0) {
    //         document.getElementById("edition").value = obj["edition"];
    //     }
    if (obj.hasOwnProperty("DOI") && obj["DOI"].length !== 0) {
        document.getElementById("doi").value = obj["DOI"];
    }
    if (obj.hasOwnProperty("ISSN") && obj["ISSN"].length !== 0) {
        document.getElementById("ISSN").value = obj["ISSN"][0];
    }
    // if (obj.hasOwnProperty("isbn") && obj["isbn"].length !== 0) {
    //         document.getElementById("isbn").value = obj["isbn"];
    //     }
    // if (obj.hasOwnProperty("note") && obj["note"].length !== 0) {
    //         document.getElementById("note").value = obj["note"];
    //     }

}



//echo "<script type='text/javascript' src='js/BibTexManager_services.js'></script>";
//echo "<script>window.location.replace('$url'+'?project='+getCookie('project')+'&doi='+'$doi')</script>";